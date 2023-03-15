<template>
	<div
		class="bg-gray-200 hover:bg-gray-100 dark:(bg-dark-50) dark:hover:(bg-dark-400) transition-all p-5 shadow-lg rounded-md"
		:class="metrics.progress === 100 ? 'border border-green-500' : ''">
		<div class="text-2xl">{{ group.name }}</div>
		<div>Tasks: {{ metrics.totalLength }}</div>
		<div class="h-100 w-200 flex items-start">
			<TasksDoughnutChart name="Group" :tasks="tasks" />
			<div class="w-100">
				<AppProgressBar
					v-for="groupMetrics in linkedGroupsMetrics"
					class="my-5"
					:progress="groupMetrics.metrics.value.progress">
					{{ groupMetrics.group.name }}
				</AppProgressBar>
			</div>
		</div>
		<div>
			<AppProgressBar class="my-5" :progress="metrics.progress">
				Progress
			</AppProgressBar>
		</div>
	</div>
</template>

<script setup lang="ts">
import { EntityGroup } from '@/interfaces/entity-groups.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useTaskStore } from '@/store/tasks.store';
import { computed, PropType, ref } from 'vue';

const props = defineProps({
	group: { type: Object as PropType<EntityGroup>, required: true },
});

const tasks = computed(() =>
	useTaskStore().getTasksLinkedToEntityGroupIdRecursive(props.group.id)
);

const linkedGroupsMetrics = computed(() =>
	useGroupStore()
		.getEntitiesLinkedToEntityGroupId(props.group.id)
		.map((group) => ({
			group: group,
			metrics: useTaskStore().computeMetrics(
				ref(useTaskStore().getTasksLinkedToEntityGroupIdRecursive(group.id))
			),
		}))
);

const metrics = useTaskStore().computeMetrics(tasks);
</script>
