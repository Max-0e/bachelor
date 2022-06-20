<template>
	<div
		class="bg-gray-300 hover:bg-gray-200 dark:(bg-dark-50) dark:hover:(bg-dark-400) transition-all p-5 shadow-lg rounded-md"
		:class="metrics.progress === 100 ? 'border border-green-500' : ''">
		<div class="text-2xl">{{ project.name }}</div>
		<div>Tasks: {{ project.tasks.length }}</div>
		<div class="relative border rounded-md border-dark-100">
			<span class="z-50">Progress: {{ metrics.progress }}%</span>
			<div
				class="bg-green-400 opacity-40 rounded-md absolute left-0 top-0 h-full"
				:style="`width:${metrics.progress}%`"></div>
		</div>
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
import { PropType, ref, toRef, toRefs } from 'vue';
import { IProject } from '@/intefaces/project.interface';
import { Status } from '@/intefaces/task.interface';

import { projectDoughnutChartOptions, getProjectChartData } from '@/chartoptions/projectDoughnutChartOptions';

import { DoughnutChart } from 'vue-chart-3';
import { useProjectStore } from '@/store/project';

const props = defineProps({
	project: { type: Object as PropType<IProject>, required: true },
	light: { type: Boolean, default: false },
});

const refProps = toRefs(props);

const metrics = useProjectStore().computeMetrics(refProps.project);
</script>
