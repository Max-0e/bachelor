<template>
	<Doughnut
		:data="
			getProjectChartData([
				metrics.value.openLength,
				metrics.value.inProgressLength,
				metrics.value.doneLength,
			])
		"
		:options="getDoughnutChartOptions(name, !hideTitle)" />
</template>
<script setup lang="ts">
import {
	getDoughnutChartOptions,
	getProjectChartData,
} from '@/components/chart-options/projectDoughnutChartOptions';
import { Task } from '@/interfaces/task.interface';
import { useTaskStore } from '@/store/tasks.store';
import { computed, onMounted, PropType, ref } from 'vue';
import { Doughnut } from 'vue-chartjs';

const props = defineProps({
	tasks: { type: Object as PropType<Task[]>, required: true },
	name: { type: String, default: 'Project' },
	hideTitle: { type: Boolean, default: false },
});

const fade = ref(true);

onMounted(() => {
	fade.value = false;
});

const metrics = computed(() => useTaskStore().computeMetrics(ref(props.tasks)));
</script>
