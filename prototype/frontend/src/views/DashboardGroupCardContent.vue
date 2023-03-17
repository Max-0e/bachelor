<template>
	<span class="text-xl">
		{{ group.name }}
	</span>
	<div class="flex gap-10 items-center">
		<div class="h-20 w-20">
			<TasksDoughnutChart hide-title name="Group" :tasks="tasks" />
		</div>
		Tasks: {{ metrics.totalLength }}
		<AppProgressBar class="flex-grow" :progress="metrics.progress"
			>Progress</AppProgressBar
		>
	</div>
</template>
<script setup lang="ts">
import { EntityGroup } from '@/interfaces/entity-groups.interface';
import { useTaskStore } from '@/store/tasks.store';
import { computed, PropType } from 'vue';

const props = defineProps({
	group: { type: Object as PropType<EntityGroup>, required: true },
});

const taskStore = useTaskStore();

const tasks = computed(() =>
	taskStore.getTasksLinkedToEntityGroupIdRecursive(props.group.id)
);

const metrics = taskStore.computeMetrics(tasks);
</script>
