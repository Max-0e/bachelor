<template>
	<div
		class="bg-gray-300 w-full hover:bg-gray-200 dark:(bg-dark-50) dark:hover:(bg-dark-400) transition-all p-5 shadow-lg rounded-md"
		:class="'' /*averageInitiativeProgress === 100 ? 'border border-green-500' : ''*/">
		<div class="text-2xl">{{ objective.name }}</div>
		<!-- <div>Initiatives: {{ objective.initiatives.length }}</div>
		<div>Average Initiative Progress: {{ averageInitiativeProgress }}%</div>
		<div>Total Progress: {{ totalProgress }}%</div> -->
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { IObjective } from '@/intefaces/objective.interface';

import { useObjectiveStore } from '@/store/objectives';

const props = defineProps({
	objective: { type: Object as PropType<IObjective>, required: true },
});

const initiatives = useObjectiveStore().getInitiativesForObjective(props.objective);

// const { totalProgress, averageInitiativeProgress } = useObjectiveStore().getMetrics(initiatives);
</script>
