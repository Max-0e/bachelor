<template>
	<div
		class="bg-gray-300 hover:bg-gray-200 dark:(bg-dark-50) dark:hover:(bg-dark-400) transition-all p-5 shadow-lg rounded-md"
		:class="progress === 100 ? 'border border-green-500' : ''">
		<div class="text-2xl">{{ project.name }}</div>
		<div>Tasks: {{ project.tasks.length }}</div>
		<div>Progress: {{ progress }}%</div>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { IProject } from '@/intefaces/project.interface';

const props = defineProps({
	project: { type: Object as PropType<IProject>, required: true },
});

const progress = Math.round(
	(props.project.tasks.filter((task) => task.done).length / props.project.tasks.length) * 100
);
</script>
