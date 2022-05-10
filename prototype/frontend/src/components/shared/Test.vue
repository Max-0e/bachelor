<template>
  <div>
    <DoughnutChart :chartData="testData" :options="options" />
    <!-- <button @click="shuffleData">Shuffle</button> -->
  </div>
</template>

<script setup lang="ts">
import { ChartOptions, ChartData } from 'chart.js';
import { computed, ref } from 'vue';
import { DoughnutChart } from 'vue-chart-3';

const data = ref([30, 40, 60, 70, 5]);
// const doughnutRef = ref<ExtractComponentData<typeof DoughnutChart>>();

const options = ref<ChartOptions<'doughnut'>>({
  responsive: true,
  animation: {
        animateRotate: true,
        animateScale: true,
    },
  plugins: {
    legend: {
      position: 'top',
      display: false
    },
    title: {
      display: true,
      text: 'Chart.js Doughnut Chart',
    },
  },
});

const testData = computed<ChartData<'doughnut'>>(() => ({
  labels: ['Paris', 'Nîmes', 'Toulon', 'Perpignan', 'Autre'],
  datasets: [
    {
      data: data.value,
      backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
    },
  ],
}));
</script>