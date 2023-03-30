<template>
	<div class="flex items-center justify-between">
		<div class="text-3xl font-bold">Task-Board</div>
		<div class="flex items-center gap-2">
			<AppIcon>sort</AppIcon>
			<AppDropDownMenu
				class="w-48"
				selectText="select sort by"
				@update:model-value="sortBy($event)"
				:options="[
					{ name: 'name', value: 'name' },
					{ name: 'story points', value: 'storyPoints' },
					{ name: 'value', value: 'value' },
				]">
			</AppDropDownMenu>
		</div>
	</div>
	<div class="flex w-full gap-6 text-2xl py-5">
		<div class="w-1/3">Open</div>
		<div class="w-1/3">In Progress</div>
		<div class="w-1/3">Done</div>
	</div>
	<div class="flex w-full gap-6">
		<DropZone class="w-1/3 min-h-50" @onDrop="onDrop($event, 'open')">
			<TransitionGroup>
				<DraggableItem
					:data="task.id"
					:key="task.id"
					v-for="task in tasks
						.filter(({ status }) => status === 'open')
						.sort(sortingFunction)">
					<AlternativeTaskListItem
						@click="openDetailsModal(task)"
						@deleteTask="
							openDeleteTaskModal(task);
							detailsModal?.close();
						"
						:task="task"
						@onOpenDeleteTaskModal="openDeleteTaskModal(task)" />
				</DraggableItem>
			</TransitionGroup>
		</DropZone>
		<DropZone class="w-1/3 min-h-50" @onDrop="onDrop($event, 'inProgress')">
			<TransitionGroup>
				<DraggableItem
					:data="task.id"
					:key="task.id"
					v-for="task in tasks
						.filter(({ status }) => status === 'inProgress')
						.sort(sortingFunction)">
					<AlternativeTaskListItem
						@click="openDetailsModal(task)"
						@deleteTask="
							openDeleteTaskModal(task);
							detailsModal?.close();
						"
						:task="task"
						@onOpenDeleteTaskModal="openDeleteTaskModal(task)" />
				</DraggableItem>
			</TransitionGroup>
		</DropZone>
		<DropZone class="w-1/3 min-h-50" @onDrop="onDrop($event, 'done')">
			<TransitionGroup>
				<DraggableItem
					:key="task.id"
					:data="task.id"
					v-for="task in tasks
						.filter(({ status }) => status === 'done')
						.sort(sortingFunction)">
					<AlternativeTaskListItem
						@click="openDetailsModal(task)"
						:task="task"
						@onOpenDeleteTaskModal="openDeleteTaskModal(task)" />
				</DraggableItem>
			</TransitionGroup>
		</DropZone>
	</div>

	<AppYesNoModal ref="deleteModal" @yes="taskStore.deleteEntity(taskToDelete!)">
		Delete Project "{{ taskToDelete?.name }}"?
	</AppYesNoModal>
	<AppModal ref="detailsModal" large>
		<TaskDetails
			v-if="!!taskForDetails"
			:task="taskForDetails"
			@deleteTask="
				openDeleteTaskModal($event);
				detailsModal?.close();
			"></TaskDetails>
	</AppModal>
</template>

<script setup lang="ts">
import { modalRef } from '@/interfaces/modal.interface';
import { Status, Task } from '@/interfaces/task.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useTaskStore } from '@/store/tasks.store';
import { sortByNumber, sortByString } from '@/utility/sort';
import { computed, Ref, ref } from 'vue';

const taskStore = useTaskStore();

const taskToDelete: Ref<Task | undefined> = ref();
const taskForDetails: Ref<Task | undefined> = ref();
const deleteModal = modalRef();
const detailsModal = modalRef();

function openDeleteTaskModal(task: Task) {
	deleteModal.value!.open();
	taskToDelete.value = task;
}

const currentProject = useGroupStore().currentEntity;

const tasks = computed(() =>
	taskStore.getEntitiesLinkedToEntityGroupId(currentProject!.id)
);

const sortingFunction = ref();

function sortBy(property: keyof Task) {
	if (property === 'name') {
		sortingFunction.value = sortByString<Task>(property);
	} else {
		sortingFunction.value = sortByNumber<Task>(property);
	}
}

const onDrop = (taskId: string, status: Status) => {
	const task = tasks.value.find((task) => task.id == taskId);

	if (!task) return;
	if (task.status === status) return;

	task.status = status;
	taskStore.updateEntity(task.id, task);
};

const openDetailsModal = (task: Task) => {
	taskForDetails.value = task;
	detailsModal.value?.open();
};
</script>
