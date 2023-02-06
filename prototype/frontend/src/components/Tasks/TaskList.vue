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
				<AppIcon class="text-red-600 hover:bg-dark-700" @click=""
					>remove_circle_outline</AppIcon
				>
			</AppToolTip>
		</div>
	</TransitionGroup>
	<!-- Add Task Field -->
	<div class="flex items-center">
		<div
			class="border border-dark-100 w-full rounded-md flex justify-between items-center p-1 m-1"
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
					:iconButton="true"
					:color="'red'"
					:slim="true"
					class="px-2 m-1 float-right"
					@click="setDefaults()"
					>clear</AppButton
				>
				<AppButton
					:iconButton="true"
					:color="'blue'"
					:slim="true"
					class="px-2 m-1 float-right"
					@click="createTask()"
					>done</AppButton
				>
			</span>
		</div>
		<div
			class="border border-dark-100 w-full rounded-md flex justify-around items-center p-1 m-1"
			v-else>
			<AppToolTip text="create new Task">
				<AppIcon
					class="hover:bg-light-900 dark:hover:bg-dark-400"
					@click="createNewTask = true">
					add
				</AppIcon>
			</AppToolTip>
		</div>
	</div>
</template>

<script setup lang="ts">
import { validationType } from '@/enums/validationType.enum';
import { EntityGroup } from '@/intefaces/entity-groups.interface';
import { inputRef } from '@/intefaces/form.interface';
import { Status } from '@/intefaces/task.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useTaskStore } from '@/store/tasks.store';
import { PropType, ref } from 'vue';
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

const tasks = ref(
	taskStore.getEntitiesLinkedToEntityGroupId(currentProject.value!.id)
);

const status = ref<Status>('open');
const name = inputRef();
const formGroup = new FormGroup({ name });

function createTask() {
	if (!formGroup.validate()) return;

	const entityGroupIds = [currentProject.value!.id];
	if (!!props.epic) entityGroupIds.push(props.epic.id);

	taskStore.createEntity({
		entityGroupIds,
		storyPoints: 0,
		name: formGroup.formObjects.name.value,
		status: status.value,
	});

	setDefaults();
}

// function removeFromEpic(task: ITask) {
// 	if (!props.epic) return;
// 	task.epics = task.epics.filter((epicId) => props.epic?.id !== epicId);
// 	projectStore.updateTask(props.project, task);
// }

function setDefaults() {
	status.value = 'open';
	name.value?.patchValue('');
	createNewTask.value = false;
}
</script>
