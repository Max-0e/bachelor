<template>
	<div
		class="rounded-md p-5 shadow-lg relative cursor-pointer transition-all bg-gray-200 hover:bg-gray-300 dark:(bg-dark-400) dark:hover:(bg-dark-50)">
		<div class="text-xl font-medium pt-3">
			{{ epic.name }}
		</div>
		<AppToolTip
			class="absolute top-0 right-0"
			text="delete Epic"
			position="right">
			<AppIcon button @click.stop="$emit('deleteEpic')">delete</AppIcon>
		</AppToolTip>
		<div class="h-100 w-100 mx-auto">
			<TasksDoughnutChart :tasks="tasks" />
		</div>
		<AppProgressBar class="my-5" :progress="metrics.progress"
			>Progress</AppProgressBar
		>
	</div>
</template>
<script setup lang="ts">
import { EntityGroup } from '@/interfaces/entity-groups.interface';
import { useTaskStore } from '@/store/tasks.store';
import { computed, PropType } from 'vue';

const taskStore = useTaskStore();

const props = defineProps({
	epic: { type: Object as PropType<EntityGroup>, required: true },
	project: { type: Object as PropType<EntityGroup>, required: true },
});

const tasks = computed(() =>
	taskStore.getEntitiesLinkedToEntityGroupId(props.epic.id)
);

const metrics = taskStore.computeMetrics(tasks);

defineEmits<{ event: 'deleteEpic' }>();
</script>
