<template>
	<Doughnut
		:data="
			getProjectChartData([
				metrics.value.openLength,
				metrics.value.inProgressLength,
				metrics.value.doneLength,
			])
		"
		:options="projectDoughnutChartOptions" />
</template>
<script setup lang="ts">
import {
	getProjectChartData,
	projectDoughnutChartOptions,
} from '@/components/chartoptions/projectDoughnutChartOptions';
import { Task } from '@/interfaces/task.interface';
import { useTaskStore } from '@/store/tasks.store';
import { computed, PropType, ref } from 'vue';
import { Doughnut } from 'vue-chartjs';

const props = defineProps({
	tasks: { type: Object as PropType<Task[]>, required: true },
});

const metrics = computed(() => useTaskStore().computeMetrics(ref(props.tasks)));
</script>
