<template>
	<div
		class="dark:(bg-dark-50) dark:hover:(bg-dark-400) cursor-pointer rounded-md bg-gray-200 p-5 shadow-lg transition-all hover:bg-gray-100"
		:class="metrics.progress === 100 ? 'border border-green-500' : ''">
		<div class="text-2xl">{{ group.name }}</div>
		<div>Tasks: {{ metrics.totalLength }}</div>
		<div class="h-100 min-w-170 flex items-start justify-between">
			<div class="h-100 w-100">
				<TasksDoughnutChart name="Group" :tasks="tasks" />
			</div>
			<div class="w-1/2">
				<AppProgressBar
					v-for="groupMetrics in linkedGroupsMetrics.slice(0, 7)"
					class="my-5"
					:progress="groupMetrics.metrics.value.progress">
					{{ groupMetrics.group.name }}
				</AppProgressBar>
				<div v-if="linkedGroupsMetrics.length > 7" class="italic">
					+ {{ linkedGroupsMetrics.length - 7 }} linked Groups
				</div>
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

const taskStore = useTaskStore();

const tasks = computed(() =>
	taskStore.getTasksLinkedToEntityGroupIdRecursive(props.group.id)
);

const linkedGroupsMetrics = computed(() =>
	useGroupStore()
		.getEntitiesLinkedToEntityGroupId(props.group.id)
		.map((group) => ({
			group: group,
			metrics: taskStore.computeMetrics(
				ref(taskStore.getTasksLinkedToEntityGroupIdRecursive(group.id))
			),
		}))
);

const metrics = taskStore.computeMetrics(tasks);
</script>
