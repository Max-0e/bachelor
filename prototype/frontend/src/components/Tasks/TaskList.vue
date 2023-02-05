<script setup lang="ts">
import AppTaskListItem from '../../../../../old/Tasks/Tasks-Components/TaskListItem.vue';
import AppButton from '../shared/Input/AppButton.vue';
import AppInputField from '../shared/Input/AppInputField.vue';
import AppIcon from '../shared/UI/AppIcon.vue';

import { IEpic } from '@/intefaces/epic.interface';
import { IProject } from '@/intefaces/project.interface';
import { ICreateTask, ITask } from '@/intefaces/task.interface';
import { useProjectStore } from '@/store/project';
import { PropType, Ref, ref } from 'vue';
import AppDropDownMenu from '../shared/Input/AppDropDownMenu.vue';
import AppToolTip from '../shared/UI/AppToolTip.vue';

const projectStore = useProjectStore();

const defaultTaskValue = { name: '', status: Status.open };
const createNewTask = ref(false);

const taskToCreate: Ref<ICreateTask> = ref({
	name: defaultTaskValue.name,
	status: defaultTaskValue.status,
});

function createTask() {
	if (taskToCreate.value.name === defaultTaskValue.name) return;
	if (!!props.epic) taskToCreate.value.epics = [props.epic.id];
	projectStore.createTask(projectStore.getCurrentProject, taskToCreate.value);
	setDefaults();
}

function removeFromEpic(task: ITask) {
	if (!props.epic) return;
	task.epics = task.epics.filter((epicId) => props.epic?.id !== epicId);
	projectStore.updateTask(props.project, task);
}

function setDefaults() {
	taskToCreate.value = {
		name: defaultTaskValue.name,
		status: defaultTaskValue.status,
	};
	createNewTask.value = false;
}
const props = defineProps({
	project: { type: Object as PropType<IProject>, required: true },
	epic: { type: Object as PropType<IEpic>, required: false },
});
</script>
<template>
	<!-- Table Header -->
	<div class="w-full flex justify-between p-5 m-2">
		<span class="w-1/3 text-left">
			<b>Name</b>
		</span>
		<span class="w-1/3 text-left">
			<b>Done</b>
		</span>
		<span class="w-1/3 text-right">
			<b>Actions</b>
		</span>
	</div>
	<!-- Task List -->
	<div
		class="flex items-center"
		v-for="task in (!!epic ? project.tasks.filter(task => task.epics?.includes(epic!.id)) : project.tasks)">
		<AppTaskListItem :task="task" :project="project" />
		<AppToolTip text="remove from epic" position="left" v-if="!!epic">
			<AppIcon
				class="text-red-600 hover:bg-dark-700"
				@click="removeFromEpic(task)"
				>remove_circle_outline</AppIcon
			>
		</AppToolTip>
	</div>
	<!-- Add Task Field -->
	<div
		class="border border-dark-100 w-full rounded-md flex justify-between items-center p-2 m-2"
		v-if="createNewTask">
		<span class="w-1/3 text-left">
			<AppInputField
				v-model="taskToCreate.name"
				type="text"
				name="name"
				id="name"
				placeholder="Task-Name"
				label="Task-Name" />
		</span>
		<span class="w-1/3 text-left">
			<AppDropDownMenu
				v-model="taskToCreate.status"
				selectText="select Status"
				:options="[
					{ name: Status[Status.open], value: Status.open },
					{
						name: Status[Status.inProgress],
						value: Status.inProgress,
						disabled:
							project.tasks.filter((task) => task.status === Status.inProgress)
								.length >= project.wipLimit,
						disabledTooltip: 'WIP-Limit Reached',
					},
					{ name: Status[Status.done], value: Status.done },
				]"></AppDropDownMenu>
		</span>
		<span class="w-1/3">
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
		class="border border-dark-100 w-full rounded-md flex justify-around items-center p-2 m-2"
		v-else>
		<AppToolTip text="create new Task">
			<AppIcon
				class="hover:bg-light-900 dark:hover:bg-dark-400"
				@click="createNewTask = true">
				add
			</AppIcon>
		</AppToolTip>
	</div>
</template>
