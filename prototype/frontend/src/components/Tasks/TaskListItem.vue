<template>
	<div
		class="border border-dark-100 w-full rounded-md flex justify-between items-center p-1 m-1">
		<span class="w-1/3 text-left px-5">
			<AppInlineInputField
				v-model="task.name"
				type="text"
				name="name"
				id="name"
				placeholder="Task-Name"
				label="Task-Name"
				:with-label="false"
				@save="taskStore.updateEntity(task.id, task)" />
		</span>
		<span class="w-1/3 text-left px-5">
			<AppDropDownMenu
				v-model="task.status"
				@update:model-value="taskStore.updateEntity(task.id, task)"
				selectText="select Status"
				:defaultValueName="task.status"
				:options="options"></AppDropDownMenu>
		</span>
		<span class="w-1/3 px-5">
			<div class="float-right">
				<AppToolTip text="delete Task" position="left">
					<AppIcon
						class="px-2 m-1 hover:bg-light-900 dark:hover:bg-dark-400"
						@click="deleteModal!.open()"
						>delete</AppIcon
					>
				</AppToolTip>
			</div>
		</span>
	</div>
	<AppYesNoModal
		ref="deleteModal"
		@yes="
			taskStore.deleteEntity(task);
			deleteModal!.close();
		">
		Delete Project "{{ task.name }}"?
	</AppYesNoModal>
</template>
<script setup lang="ts">
import { modalRef } from '@/interfaces/modal.interface';
import { Task } from '@/interfaces/task.interface';
import { useTaskStore } from '@/store/tasks.store';
import { PropType } from 'vue';

const options = [
	{ name: 'open', value: 'open' },
	{ name: 'inProgress', value: 'inProgress' },
	{ name: 'done', value: 'done' },
];

const taskStore = useTaskStore();
const deleteModal = modalRef();

defineProps({
	task: { type: Object as PropType<Task>, required: true },
});
</script>
