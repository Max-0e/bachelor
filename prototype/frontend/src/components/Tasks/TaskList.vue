<template>
	<!-- Table Header -->
	<div class="w-full flex justify-between p-5 m-2">
		<span class="w-1/3 text-left">
			<b>Name</b>
		</span>
		<span class="w-1/3 text-left">
			<b>Status</b>
		</span>
		<span class="w-1/3 text-right">
			<b>Actions</b>
		</span>
	</div>
	<!-- Task List -->
	<TransitionGroup>
		<div class="flex items-center" v-for="task in tasks" :key="task.id">
			<TaskListItem :task="task" />
			<AppToolTip text="remove from epic" position="left" v-if="!!epic">
				<AppIcon class="text-red-600" button @click="removeFromEpic(task)"
					>remove_circle_outline</AppIcon
				>
			</AppToolTip>
		</div>
	</TransitionGroup>
	<!-- Add Task Field -->
	<div class="flex items-center">
		<div
			class="border dark:border-dark-800 w-full rounded-md flex justify-between items-center p-1 m-1"
			v-if="createNewTask">
			<span class="w-1/3 text-left px-5">
				<AppInputField
					ref="name"
					placeholder="name"
					label="name"
					id="name"
					:validation-types="[validationType.required, validationType.name]">
				</AppInputField>
			</span>
			<span class="w-1/3 text-left px-5">
				<AppDropDownMenu
					v-model="status"
					selectText="select Status"
					:options="options"></AppDropDownMenu>
			</span>
			<span class="w-1/3 px-5">
				<AppButton
					iconButton
					color="red"
					slim
					class="px-2 m-1 float-right"
					@click="setDefaults()"
					>clear</AppButton
				>
				<AppButton
					iconButton
					color="blue"
					slim
					class="px-2 m-1 float-right"
					@click="createTask()"
					>done</AppButton
				>
			</span>
		</div>
		<div
			class="border dark:border-dark-800 w-full rounded-md flex justify-around items-center p-1 m-1"
			v-else>
			<AppToolTip text="create new Task">
				<AppIcon button @click="createNewTask = true"> add </AppIcon>
			</AppToolTip>
		</div>
	</div>
</template>

<script setup lang="ts">
import { validationType } from '@/enums/validationType.enum';
import { EntityGroup } from '@/interfaces/entity-groups.interface';
import { inputRef } from '@/interfaces/form.interface';
import { Status, Task } from '@/interfaces/task.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useTaskStore } from '@/store/tasks.store';
import { computed, PropType, ref } from 'vue';
import { FormGroup } from '../shared/Input/formGroup';

const options = [
	{ name: 'open', value: 'open' },
	{ name: 'inProgress', value: 'inProgress' },
	{ name: 'done', value: 'done' },
];

const currentProject = ref(useGroupStore().currentEntity);
const props = defineProps({
	epic: { type: Object as PropType<EntityGroup>, required: false },
});

const createNewTask = ref(false);

const taskStore = useTaskStore();

const tasks = computed(() => {
	const groupId = props.epic?.id ?? currentProject.value!.id;
	return taskStore.getEntitiesLinkedToEntityGroupId(groupId);
});

const status = ref<Status>('open');
const name = inputRef();
const formGroup = new FormGroup({ name });

function createTask() {
	if (!formGroup.validate()) return;

	const entityGroupIds = [currentProject.value!.id];
	if (!!props.epic) entityGroupIds.push(props.epic.id);

	taskStore.createEntity({
		entityGroupIds,
		storyPoints: 1,
		name: formGroup.formObjects.name.value,
		status: status.value,
		description: '',
	});

	setDefaults();
}

function removeFromEpic(task: Task) {
	const epic = props.epic;
	if (!epic) return;
	task.entityGroupIds.splice(
		task.entityGroupIds.findIndex((id) => id === epic.id),
		1
	);
	taskStore.updateEntity(task.id, task);
}

function setDefaults() {
	status.value = 'open';
	name.value?.patchValue('');
	createNewTask.value = false;
}
</script>
