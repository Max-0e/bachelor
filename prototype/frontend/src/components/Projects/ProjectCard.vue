<template>
	<div
		class="dark:(bg-dark-50) dark:hover:(bg-dark-400) rounded-md bg-gray-200 p-5 shadow-lg transition-all hover:bg-gray-100"
		:class="metrics.progress === 100 ? 'border border-green-500' : ''">
		<div class="text-2xl">{{ project.name }}</div>
		<div>Tasks: {{ metrics.totalLength }}</div>
		<AppProgressBar :progress="metrics.progress"> Progress </AppProgressBar>
		<div class="h-100 w-100 mx-auto">
			<TasksDoughnutChart :tasks="tasks" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { EntityGroup } from '@/interfaces/entity-groups.interface';
import { useTaskStore } from '@/store/tasks.store';
import { PropType, ref } from 'vue';

const props = defineProps({
	project: { type: Object as PropType<EntityGroup>, required: true },
});

const tasks = ref(
	useTaskStore().getEntitiesLinkedToEntityGroupId(props.project.id)
);

const metrics = useTaskStore().computeMetrics(tasks);
</script>
