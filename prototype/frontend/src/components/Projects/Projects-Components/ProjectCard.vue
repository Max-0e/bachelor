<template>
	<div class="h-10 bg-gray-300 dark:(bg-dark-50) pb-5 px-5 pt-1 shadow-lg rounded-md">
		<div v-if="!!project">
			<div>{{ project.name }}</div>
		</div>
		<div v-else class="w-full h-full">
			<div class="p-1">
				<span class="material-icons">add</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { IProject } from '@/intefaces/project.interface';

defineProps({
	project: { type: Object as PropType<IProject> },
});
</script>
