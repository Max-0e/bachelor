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
	<AppTaskListItem v-for="task in project.tasks" :task="task" :project="project" />
	<!-- Add Task Field -->
	<div class="border border-dark-100 w-full rounded-md flex justify-between items-center p-2 m-2" v-if="createNewTask">
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
			<select class="bg-dark-400 w-1/2" v-model="taskToCreate.status">
				<option :value="Status.open">{{Status[Status.open]}}</option>
				<option :value="Status.inProgress">{{Status[Status.inProgress]}}</option>
				<option :value="Status.done">{{Status[Status.done]}}</option>
			</select>
		</span>
		<span class="w-1/3">
			<AppButton :iconButton="true" :color="'red'" :slim="true" class="px-2 m-1 float-right" @click="setDefaults()"
				>clear</AppButton
			>
			<AppButton :iconButton="true" :color="'blue'" :slim="true" class="px-2 m-1 float-right" @click="createTask()"
				>done</AppButton
			>
		</span>
	</div>
	<div class="border border-dark-100 w-full rounded-md flex justify-around items-center p-2 m-2" v-else>
		<AppToolTip text="create new Task">
			<AppIcon class="hover:bg-light-900 dark:hover:bg-dark-400" @click="createNewTask = true"> add </AppIcon>
		</AppToolTip>
	</div>
</template>
<script setup lang="ts">
import AppIcon from '../shared/AppIcon.vue';
import AppButton from '../shared/AppButton.vue';
import AppTaskListItem from './Tasks-Components/TaskListItem.vue';
import AppInputField from '../shared/AppInputField.vue';

import { useProjectStore } from '@/store/project';
import { PropType, Ref, ref } from 'vue';
import { ICreateTask, Status } from '@/intefaces/task.interface';
import { IProject } from '@/intefaces/project.interface';
import AppToolTip from '../shared/AppToolTip.vue';

const projectStore = useProjectStore();

const defaultTaskValue = { name: '', status: Status.open };

const taskToCreate: Ref<ICreateTask> = ref({ name: defaultTaskValue.name, status: defaultTaskValue.status });

const createNewTask = ref(false);

function createTask() {
	console.log(taskToCreate.value);
	if (taskToCreate.value.name === defaultTaskValue.name) return;
	projectStore.createTask(projectStore.getCurrentProject!, taskToCreate.value);
	setDefaults();
}

function setDefaults() {
	taskToCreate.value = { name: defaultTaskValue.name, status: defaultTaskValue.status };
	createNewTask.value = false;
}
defineProps({
	project: { type: Object as PropType<IProject>, required: true },
});
</script>
