<template>
	<div class="flex w-full gap-6">
		<div
			class="w-1/2 bg-dark-50 rounded-md min-h-10 p-5" :class="markTargetUnDone ? 'border border-blue-500':''"
			@drop="onDrop($event, false)"
			@dragover.prevent
			@dragenter="markTargetUnDone=true"
			@dragleave="markTargetUnDone=false"
			>
            <div
                v-for="task in project.tasks.filter((task) => !task.done)"
                draggable="true"
                @dragstart="startDrag($event, task)">
                <AlternativeTaskListItem :task="task" :project="project"  @onOpenDeleteTaskModal="task => openDeleteTaskModal(task)"/>
            </div>
		</div>
		<div
			class="w-1/2 bg-dark-50 rounded-md min-h-10 p-5" :class="markTargetDone ? 'border border-blue-500':''"
			@drop="onDrop($event, true)"
			@dragover.prevent
			@dragenter="markTargetDone=true"
			@dragleave="markTargetDone=false"
			>
			<div
                v-for="task in project.tasks.filter((task) => task.done)"
                draggable="true"
                @dragstart="startDrag($event, task)">
                <AlternativeTaskListItem :task="task" :project="project" @onOpenDeleteTaskModal="task => openDeleteTaskModal(task)"/>
            </div>
		</div>
	</div>

    <AppYesNoModal
		:open="deleteModalOpen"
		@yes="
			projectStore.deleteTask(project, taskToDelete!);
			deleteModalOpen = false;
		"
		@cancel="deleteModalOpen = false">
		Delete Project "{{ taskToDelete.name }}"?
	</AppYesNoModal>
</template>

<script setup lang="ts">
import { IProject } from '@/intefaces/project.interface';
import { ITask } from '@/intefaces/task.interface';
import { useProjectStore } from '@/store/project';
import { PropType, ref } from 'vue';
import AlternativeTaskListItem from './Tasks-Components/AlternativeTaskListItem.vue';

import AppYesNoModal from '@/components/shared/AppYesNoModal.vue';

const projectStore = useProjectStore();

const taskToDelete = ref({name: ""});
const deleteModalOpen = ref(false);
const markTargetDone = ref(false);
const markTargetUnDone = ref(false);

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
function onDrop(evt: DragEvent, done: boolean) {
	const taskId = evt.dataTransfer?.getData('taskId');
	const task = props.project.tasks.find((task) => task.id == taskId);
	if (task) {
		if (task.done === done) {
			return;
		}
		task.done = done;
		useProjectStore().updateTask(props.project, task);
	}
	markTargetDone.value = false;
	markTargetUnDone.value = false;
}
</script>
