<template>
	<Doughnut
		:data="
			getProjectChartData(
				appStore.progressType === 'absolute'
					? [
							metrics.value.openLength,
							metrics.value.inProgressLength,
							metrics.value.doneLength,
					  ]
					: appStore.progressType === 'storyPoints'
					? [
							metrics.value.openStoryPoints,
							metrics.value.inProgressStoryPoints,
							metrics.value.doneStoryPoints,
					  ]
					: [
							metrics.value.openValue,
							metrics.value.inProgressValue,
							metrics.value.doneValue,
					  ]
			)
		"
		:options="getDoughnutChartOptions(name, !hideTitle)" />
</template>
<script setup lang="ts">
import {
	getDoughnutChartOptions,
	getProjectChartData,
} from '@/components/chart-options/projectDoughnutChartOptions';
import { Task } from '@/interfaces/task.interface';
import { useAppStore } from '@/store/app';
import { useTaskStore } from '@/store/tasks.store';
import { PropType, computed, ref } from 'vue';
import { Doughnut } from 'vue-chartjs';

const props = defineProps({
	tasks: { type: Object as PropType<Task[]>, required: true },
	name: { type: String, default: 'Project' },
	hideTitle: { type: Boolean, default: false },
});

const appStore = useAppStore();

const metrics = computed(() => useTaskStore().computeMetrics(ref(props.tasks)));
</script>
