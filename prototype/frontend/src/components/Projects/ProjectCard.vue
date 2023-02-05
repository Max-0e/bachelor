<template>
	<div
		class="bg-gray-300 hover:bg-gray-200 dark:(bg-dark-50) dark:hover:(bg-dark-400) transition-all p-5 shadow-lg rounded-md"
		:class="metrics.progress === 100 ? 'border border-green-500' : ''">
		<div class="text-2xl">{{ project.name }}</div>
		<div>Tasks: {{ 10 }}</div>
		<AppProgressBar :progress="metrics.progress"> Progress </AppProgressBar>
		<!-- <div v-if="!light" class="h-100 w-100 mx-auto">
			<DoughnutChart
				:chartData="
					getProjectChartData([metrics.openTasksLength, metrics.inProgressTasksLength, metrics.doneTasksLength])
				"
				:options="projectDoughnutChartOptions" />
		</div> -->
	</div>
</template>

<script setup lang="ts">
import { EntityGroup } from '@/intefaces/entity-groups.interface';
import { PropType } from 'vue';

defineProps({
	project: { type: Object as PropType<EntityGroup>, required: true },
});

const metrics = { progress: 80 };
</script>
