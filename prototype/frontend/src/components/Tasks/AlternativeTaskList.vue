<template>
	<div class="flex w-full gap-6">
		<div
			class="w-1/2 bg-dark-50 rounded-md min-h-10 p-5" :class="markTargetOpen ? 'border border-blue-500':''"
			@drop="onDrop($event, Status.open)"
			@dragover.prevent
			@dragenter="markTargetOpen=true"
			@dragleave="markTargetOpen=false"
			>
            <div
                v-for="task in project.tasks.filter((task) => task.status === Status.open)"
                draggable="true"
                @dragstart="startDrag($event, task)">
                <AlternativeTaskListItem :task="task" :project="project"  @onOpenDeleteTaskModal="task => openDeleteTaskModal(task)"/>
            </div>
		</div>
		<div
			class="w-1/2 bg-dark-50 rounded-md min-h-10 p-5" :class="markTargetInProgress ? 'border border-blue-500':''"
			@drop="onDrop($event, Status.inProgress)"
			@dragover.prevent
			@dragenter="markTargetInProgress=true"
			@dragleave="markTargetInProgress=false"
			>
			<div
                v-for="task in project.tasks.filter((task) => task.status === Status.inProgress)"
                draggable="true"
                @dragstart="startDrag($event, task)">
                <AlternativeTaskListItem :task="task" :project="project" @onOpenDeleteTaskModal="task => openDeleteTaskModal(task)"/>
            </div>
		</div>
		<div
			class="w-1/2 bg-dark-50 rounded-md min-h-10 p-5" :class="markTargetDone ? 'border border-blue-500':''"
			@drop="onDrop($event, Status.done)"
			@dragover.prevent
			@dragenter="markTargetDone=true"
			@dragleave="markTargetDone=false"
			>
			<div
                v-for="task in project.tasks.filter((task) => task.status === Status.done)"
                draggable="true"
                @dragstart="startDrag($event, task)">
                <AlternativeTaskListItem :task="task" :project="project" @onOpenDeleteTaskModal="task => openDeleteTaskModal(task)"/>
            </div>
		</div>
	</div>

    <AppYesNoModal
		:open="deleteModalOpen"
		@yes="
			projectStore.deleteTask(project, taskToDelete);
			deleteModalOpen = false;
		"
		@cancel="deleteModalOpen = false">
		Delete Project "{{ taskToDelete.name }}"?
	</AppYesNoModal>
</template>

<script setup lang="ts">
import { IProject } from '@/intefaces/project.interface';
import { ITask, Status } from '@/intefaces/task.interface';
import { useProjectStore } from '@/store/project';
import { PropType, Ref, ref } from 'vue';
import AlternativeTaskListItem from './Tasks-Components/AlternativeTaskListItem.vue';

import AppYesNoModal from '@/components/shared/AppYesNoModal.vue';

const projectStore = useProjectStore();

const taskToDelete: Ref<ITask> = ref({id:'', name: '', status: Status.done});
const deleteModalOpen = ref(false);

const markTargetOpen = ref(false);
const markTargetInProgress = ref(false);
const markTargetDone = ref(false);

function openDeleteTaskModal (task: any) {
    deleteModalOpen.value = true;
    taskToDelete.value = task
}

const props = defineProps({
	project: { type: Object as PropType<IProject>, required: true },
});

function startDrag(evt: DragEvent, task: ITask) {
	evt.dataTransfer!.dropEffect = 'link';
	evt.dataTransfer!.effectAllowed = 'move';
	evt.dataTransfer!.setData('taskId', task.id);
}
function onDrop(evt: DragEvent, status: Status) {
	const taskId = evt.dataTransfer?.getData('taskId');
	const task = props.project.tasks.find((task) => task.id == taskId);
	if (task) {
		if (task.status === status) {
			return;
		}
		task.status = status;
		useProjectStore().updateTask(props.project, task);
	}
	markTargetOpen.value = false;
	markTargetInProgress.value = false;
	markTargetDone.value = false;
}
</script>
