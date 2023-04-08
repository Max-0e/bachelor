<template>
	<div
		class="dark:(bg-dark-400) dark:hover:(bg-dark-50) relative cursor-pointer rounded-md bg-gray-200 p-5 shadow-lg transition-all hover:bg-gray-300">
		<div class="pt-3 text-xl font-medium">
			{{ epic.name }}
		</div>
		<AppToolTip
			class="absolute right-0 top-0"
			text="delete Epic"
			position="right">
			<AppIcon button @click.stop="$emit('deleteEpic')">delete</AppIcon>
		</AppToolTip>
		<div class="h-100 w-100 mx-auto">
			<TasksDoughnutChart name="Epic" :tasks="tasks" />
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
