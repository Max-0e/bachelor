<template>
	<div v-if="!!currentProject">
		<div class="flex justify-between m-5">
			<div class="text-2xl w-1/2">
				<AppInlineInputField
					class="mr-5 mt-2 mb-5"
					v-model="currentProject.name"
					type="text"
					name="name"
					id="name"
					placeholder="Project-Name"
					label="Project-Name"
					@save="projectStore.updateProject(currentProject!)" />
			</div>
		</div>
		<div>
			Tasks (done): {{ metrics.doneTasksLength }}<br />
			Progress: {{ metrics.progress }}%
		</div>
		<DoughnutChart
			:chartData="
				getProjectChartData([metrics.openTasksLength, metrics.inProgressTasksLength, metrics.doneTasksLength])
			"
			:options="projectDoughnutChartOptions" />
		<div class="p-5">
			<AlternativeTaskList :project="currentProject" />
		</div>
		<div class="p-5">
			<AppCollapsible triggerText="Backlog">
				<AppTaskList :project="currentProject" />
			</AppCollapsible>
		</div>
	</div>
	<div v-else>Something went Wrong...</div>
</template>
<script setup lang="ts">
import { useProjectStore } from '@/store/project';
import { ref } from 'vue';
import AppInlineInputField from '../shared/Input/AppInlineInputField.vue';
import AppTaskList from '../Tasks/TaskList.vue';
import AlternativeTaskList from '../Tasks/AlternativeTaskList.vue';
import AppCollapsible from '../shared/UI/AppCollapsible.vue';

import { DoughnutChart } from 'vue-chart-3';

import { projectDoughnutChartOptions, getProjectChartData } from '@/chartoptions/projectDoughnutChartOptions';

const projectStore = useProjectStore();

const currentProject = ref(projectStore.getCurrentProject);

const metrics = projectStore.computeMetricsForProject(currentProject);
</script>
