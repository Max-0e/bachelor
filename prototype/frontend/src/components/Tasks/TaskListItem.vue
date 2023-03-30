<template>
	<div
		class="border dark:border-dark-800 w-full rounded-md flex items-center p-1 m-1">
		<span class="w-1/4 text-left px-5">
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
		<span class="w-1/4 text-left px-5">
			<AppDropDownMenu
				:bg-color="
					task.status === 'done'
						? 'bg-successGreen'
						: task.status === 'inProgress'
						? 'bg-blue-800'
						: undefined
				"
				v-model="task.status"
				@update:model-value="taskStore.updateEntity(task.id, task)"
				selectText="select Status"
				:defaultValueName="task.status"
				:options="options"></AppDropDownMenu>
		</span>
		<span class="w-1/8 text-left px-5 flex justify-evenly items-center">
			<AppToolTip position="top" text="Story Points">
				<AppIcon>token</AppIcon>
			</AppToolTip>
			<AppNumberInput
				:min-number="1"
				:value="task.storyPoints"
				debounce
				@change="
					task.storyPoints = $event;
					taskStore.updateEntity(task.id, task);
				" />
		</span>
		<span class="w-1/8 text-left px-5 flex justify-evenly items-center">
			<AppToolTip position="top" text="value">
				<AppIcon>diamond</AppIcon>
			</AppToolTip>
			<AppNumberInput
				:min-number="1"
				:value="task.value"
				debounce
				@change="
					task.value = $event;
					taskStore.updateEntity(task.id, task);
				" />
		</span>
		<span class="w-1/8">
			<AppDropDownMenu
				@update:model-value="addTaskToEpic(task, $event)"
				selectText="select Epic"
				ref="epicDropdown"
				:options="
					availableEpics.map((epic) => ({ name: epic.name, value: epic.id }))
				"></AppDropDownMenu>
		</span>
		<span class="w-1/8 px-5">
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
import { useGroupStore } from '@/store/entity-groups.store';
import { useTaskStore } from '@/store/tasks.store';
import { computed, onMounted, PropType, ref, toRef, watch } from 'vue';
import AppDropDownMenu from '../shared/Input/AppDropDownMenu.vue';

const options = [
	{ name: 'open', value: 'open' },
	{ name: 'inProgress', value: 'inProgress' },
	{ name: 'done', value: 'done' },
];

const taskStore = useTaskStore();
const groupStore = useGroupStore();
const deleteModal = modalRef();

const epicDropdown = ref<InstanceType<typeof AppDropDownMenu> | null>(null);

const props = defineProps({
	task: { type: Object as PropType<Task>, required: true },
});
const availableEpics = computed(() =>
	groupStore.downwardsLinkedGroupsForCurrentGroup.filter((x) => !!x?.levelId)
);
const _task = toRef(props, 'task');
watch(_task, (x) => {
	changeSelectedEpic(x);
});

onMounted(() => {
	changeSelectedEpic(props.task);
});

const changeSelectedEpic = (currentTask: Task) => {
	const selectedEpic = availableEpics.value.find((epic) =>
		currentTask.entityGroupIds.includes(epic.id)
	);
	if (!!selectedEpic) {
		epicDropdown.value?.selectOption({
			name: selectedEpic.name,
			value: selectedEpic.id,
		});
	} else {
		epicDropdown.value?.reset();
	}
};

const addTaskToEpic = (task: Task, epicId: string) => {
	if (task.entityGroupIds.some((id) => epicId === id)) return;

	const epicIndex = task.entityGroupIds.findIndex(
		(id) => id !== groupStore.currentEntity?.id
	);
	if (epicIndex !== -1) {
		task.entityGroupIds.splice(epicIndex, 1);
	}
	task.entityGroupIds.push(epicId);
	taskStore.updateEntity(task.id, task);
};
</script>
