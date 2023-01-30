<template>
	<div
		class="bg-gray-300 hover:bg-gray-200 dark:(bg-dark-50) dark:hover:(bg-dark-400) transition-all p-5 shadow-lg rounded-md"
		:class="metrics.progress === 100 ? 'border border-green-500' : ''">
		<div class="text-2xl">{{ project.name }}</div>
		<div>Tasks: {{ project.tasks.length }}</div>
		<AppProgressBar :progress="metrics.progress">
			Progress
		</AppProgressBar>
		<div v-if="!light" class="h-100 w-100 mx-auto">
			<DoughnutChart
				:chartData="
					getProjectChartData([metrics.openTasksLength, metrics.inProgressTasksLength, metrics.doneTasksLength])
				"
				:options="projectDoughnutChartOptions" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { PropType, toRefs } from 'vue';
import { IProject } from '@/intefaces/project.interface';
import AppProgressBar from '../../shared/UI/AppProgressBar.vue';

import { projectDoughnutChartOptions, getProjectChartData } from '@/chartoptions/projectDoughnutChartOptions';

import { DoughnutChart } from 'vue-chart-3';
import { useProjectStore } from '@/store/project';

const props = defineProps({
	project: { type: Object as PropType<IProject>, required: true },
	light: { type: Boolean, default: false },
});

const refProps = toRefs(props);

const metrics = useProjectStore().computeMetricsForProject(refProps.project);
</script>
