<template>
	<div class="w-full flex justify-between">
		<AppInlineInputField
			class="mr-5 mt-2 mb-5"
			v-model="task.name"
			type="text"
			name="name"
			id="name"
			placeholder="Description"
			label="Description"
			@save="taskStore.updateEntity(task.id, task)" />
		<AppIcon @click="$emit('deleteTask', task)">delete</AppIcon>
	</div>
	<div class="w-full flex justify-left items-center gap-10 px-4">
		<AppDropDownMenu
			v-model="task.status"
			@update:model-value="taskStore.updateEntity(task.id, task)"
			selectText="select Status"
			:defaultValueName="task.status"
			:options="options"></AppDropDownMenu>
		<div class="bg-dark-700 rounded-lg py-3 px-4">{{ task.storyPoints }}</div>
		<AppDropDownMenu
			@update:model-value="addTaskToEpic(task, $event)"
			selectText="select Epic"
			ref="epicDropdown"
			:options="
				availableEpics.map((epic) => ({ name: epic.name, value: epic.id }))
			"></AppDropDownMenu>
	</div>
	<AppInlineTextArea
		class="w-full"
		v-model="task.description"
		name="description"
		id="description"
		placeholder="Description"
		label="Description"
		@save="taskStore.updateEntity(task.id, task)" />
</template>
<script setup lang="ts">
import { Task } from '@/interfaces/task.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useTaskStore } from '@/store/tasks.store';
import { computed, ref, toRef } from '@vue/reactivity';
import { onMounted, PropType, watch } from 'vue';
import AppDropDownMenu from '../shared/Input/AppDropDownMenu.vue';

const options = [
	{ name: 'open', value: 'open' },
	{ name: 'inProgress', value: 'inProgress' },
	{ name: 'done', value: 'done' },
];

const groupStore = useGroupStore();
const taskStore = useTaskStore();

const epicDropdown = ref<InstanceType<typeof AppDropDownMenu> | null>(null);

const availableEpics = computed(() =>
	groupStore.downwardsLinkedGroupsForCurrentGroup.filter((x) => !!x?.levelId)
);
const props = defineProps({
	task: { type: Object as PropType<Task>, required: true },
});
const task = toRef(props, 'task');
watch(task, (x) => {
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

defineEmits<{
	(event: 'deleteTask', task: Task): void;
}>();
</script>