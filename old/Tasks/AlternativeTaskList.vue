<template>
	<div class="flex w-full gap-6 text-2xl py-5">
		<div class="w-1/3">Open</div>
		<div class="w-1/3">
			In Progress ({{ project.tasks.filter((task) => task.status === Status.inProgress).length }} of
			{{ project.wipLimit }})
		</div>
		<div class="w-1/3">Done</div>
	</div>
	<div class="flex w-full gap-6">
		<DropZone class="w-1/3" @onDrop="onDrop($event, Status.open)">
			<DraggableItem
				@dragstart=""
				:data="task.id"
				v-for="task in project.tasks.filter((task) => task.status === Status.open)">
				<AlternativeTaskListItem
					:task="task"
					:project="project"
					@onOpenDeleteTaskModal="(task) => openDeleteTaskModal(task)" />
			</DraggableItem>
		</DropZone>
		<DropZone
			:disable="project.tasks.filter((task) => task.status === Status.inProgress).length >= project.wipLimit"
			class="w-1/3"
			@onDrop="onDrop($event, Status.inProgress)">
			<DraggableItem
				@dragstart=""
				:data="task.id"
				v-for="task in project.tasks.filter((task) => task.status === Status.inProgress)">
				<AlternativeTaskListItem
					:task="task"
					:project="project"
					@onOpenDeleteTaskModal="(task) => openDeleteTaskModal(task)" />
			</DraggableItem>
		</DropZone>
		<DropZone class="w-1/3" @onDrop="onDrop($event, Status.done)">
			<DraggableItem
				@dragstart=""
				:data="task.id"
				v-for="task in project.tasks.filter((task) => task.status === Status.done)">
				<AlternativeTaskListItem
					:task="task"
					:project="project"
					@onOpenDeleteTaskModal="(task) => openDeleteTaskModal(task)" />
			</DraggableItem>
		</DropZone>
	</div>

	<AppYesNoModal ref="deleteModal" @yes="projectStore.deleteTask(project, taskToDelete)">
		Delete Project "{{ taskToDelete.name }}"?
	</AppYesNoModal>
</template>

<script setup lang="ts">
import { IProject } from '@/intefaces/project.interface';
import { ITask, Status } from '@/intefaces/task.interface';
import { useProjectStore } from '@/store/project';
import { PropType, Ref, ref } from 'vue';
import AlternativeTaskListItem from './Tasks-Components/AlternativeTaskListItem.vue';

import AppYesNoModal from '@/components/shared/Modal/AppYesNoModal.vue';
import DropZone from '../shared/DragAndDrop/DropZone.vue';
import DraggableItem from '../shared/DragAndDrop/DraggableItem.vue';

const projectStore = useProjectStore();

const taskToDelete: Ref<ITask> = ref({ id: '', name: '', status: Status.done });
const deleteModal = ref<InstanceType<typeof AppYesNoModal> | null>(null);

function openDeleteTaskModal(task: ITask) {
	deleteModal.value!.open();
	taskToDelete.value = task;
}

const props = defineProps({
	project: { type: Object as PropType<IProject>, required: true },
});

function onDrop(taskId: string, status: Status) {
	const task = props.project.tasks.find((task) => task.id == taskId);

	if (!task) return;
	if (task.status === status) return;

	task.status = status;
	useProjectStore().updateTask(props.project, task);
}
</script>
