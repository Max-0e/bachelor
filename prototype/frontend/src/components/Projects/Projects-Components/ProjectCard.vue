<template>
	<div
		class="bg-gray-300 hover:bg-gray-200 dark:(bg-dark-50) dark:hover:(bg-dark-400) transition-all p-5 shadow-lg rounded-md"
		:class="progress === 100 ? 'border border-green-500' : ''">
		<div class="text-2xl">{{ project.name }}</div>
		<div>Tasks: {{ project.tasks.length }}</div>
		<div>Progress: {{ Math.round((project.tasks.filter((task) => task.status === Status.done).length / project.tasks.length) * 100) }}%</div>
		<div class="h-100 w-100 mx-auto">
			<DoughnutChart :chartData="getProjectChartData(
				[
					project.tasks.filter((task) => task.status === Status.open).length,
					project.tasks.filter((task) => task.status === Status.inProgress).length,
					project.tasks.filter((task) => task.status === Status.done).length
				]
			)" :options="projectDoughnutChartOptions" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { PropType, ref, toRef, toRefs } from 'vue';
import { IProject } from '@/intefaces/project.interface';
import { Status } from '@/intefaces/task.interface';

import { projectDoughnutChartOptions, getProjectChartData } from '@/chartoptions/projectDoughnutChartOptions'

import { DoughnutChart } from 'vue-chart-3';

const props = defineProps({
	project: { type: Object as PropType<IProject>, required: true },
});

const refProps = toRefs(props);

const openTasksLength = refProps.project.value.tasks.filter((task) => task.status === Status.open).length;
const inProgressTasksLength = refProps.project.value.tasks.filter((task) => task.status === Status.inProgress).length;
const doneTasksLength = refProps.project.value.tasks.filter((task) => task.status === Status.done).length;

const progress = ref(Math.round(
	(refProps.project.value.tasks.filter((task) => task.status === Status.done).length / refProps.project.value.tasks.length) * 100
));
</script>
