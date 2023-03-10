<template>
	<div
		class="bg-gray-300 hover:bg-gray-200 dark:(bg-dark-50) dark:hover:(bg-dark-400) transition-all p-5 shadow-lg rounded-md"
		:class="metrics.progress === 100 ? 'border border-green-500' : ''">
		<div class="text-2xl">{{ project.name }}</div>
		<div>Tasks: {{ metrics.totalLength }}</div>
		<AppProgressBar :progress="metrics.progress"> Progress </AppProgressBar>
		<div class="h-100 w-100 mx-auto">
			<Doughnut
				:data="
					getProjectChartData([
						metrics.openLength,
						metrics.inProgressLength,
						metrics.doneLength,
					])
				"
				:options="projectDoughnutChartOptions" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { EntityGroup } from '@/interfaces/entity-groups.interface';
import { useTaskStore } from '@/store/tasks.store';
import { PropType, ref } from 'vue';

import { Doughnut } from 'vue-chartjs';
import {
	getProjectChartData,
	projectDoughnutChartOptions,
} from '../chartoptions/projectDoughnutChartOptions';

const props = defineProps({
	project: { type: Object as PropType<EntityGroup>, required: true },
});

const metrics = useTaskStore().computeMetrics(
	ref(useTaskStore().getEntitiesLinkedToEntityGroupId(props.project.id))
);
</script>
