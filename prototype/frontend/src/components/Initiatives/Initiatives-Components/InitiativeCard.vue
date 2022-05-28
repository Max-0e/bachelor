<template>
	<div
		class="bg-gray-300 w-full hover:bg-gray-200 dark:(bg-dark-50) dark:hover:(bg-dark-400) transition-all p-5 shadow-lg rounded-md"
		:class="metrics.averageProjectProgress === 100 ? 'border border-green-500' : ''">
		<div class="text-2xl">{{ initiative.name }}</div>
		<div>Projects: {{ initiative.projects.length }}</div>
		<div>Average Project Progress: {{ metrics.averageProjectProgress }}%</div>
		<div>Total Progress: {{ metrics.totalProgress }}%</div>
	</div>
</template>

<script setup lang="ts">
import { PropType, ref } from 'vue';
import { IInitiative } from '@/intefaces/initiative.interface';

import { useInitiativeStore } from '@/store/initiatives';
import { computed } from '@vue/reactivity';

const props = defineProps({
	initiative: { type: Object as PropType<IInitiative>, required: true },
});

const projects = ref(useInitiativeStore().getProjectsForInitiative(props.initiative));

const metrics = computed( () => useInitiativeStore().getMetrics(projects.value));
</script>
