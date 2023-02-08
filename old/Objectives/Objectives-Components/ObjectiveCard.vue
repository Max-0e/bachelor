<template>
	<div
		class="bg-gray-300 w-full hover:bg-gray-200 dark:(bg-dark-50) dark:hover:(bg-dark-400) transition-all p-5 shadow-lg rounded-md"
		:class="'' /*averageInitiativeProgress === 100 ? 'border border-green-500' : ''*/">
		<div class="text-2xl">{{ objective.name }}</div>
		<div>Initiatives: {{ objective.initiatives.length }}</div>
		<AppProgressBar :progress="metrics.averageProjectProgress">
			Average Progress
		</AppProgressBar>
		<AppProgressBar :progress="metrics.totalProgress">
			Total Progress
		</AppProgressBar>
		<!-- <DoughnutChart
				:chartData="
					getProjectChartData([metrics.openTasksLength, metrics.inProgressTasksLength, metrics.doneTasksLength])
				"
				:options="projectDoughnutChartOptions" /> -->
		<AppTest></AppTest>
	</div>
</template>

<script setup lang="ts">
import { computed, PropType, ref } from 'vue';
import { IObjective } from '@/intefaces/objective.interface';

import AppTest from '@/components/shared/Test.vue';

import { useObjectiveStore } from '@/store/objectives';
import AppProgressBar from '@/components/shared/UI/AppProgressBar.vue';

const props = defineProps({
	objective: { type: Object as PropType<IObjective>, required: true },
});

const initiatives = ref(useObjectiveStore().getInitiativesForObjective(props.objective));

const metrics = computed(() => useObjectiveStore().getMetrics(initiatives.value));
</script>
