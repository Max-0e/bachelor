import { useAppStore } from '@/store/app';
import { ChartData, ChartOptions } from 'chart.js';

export const getDoughnutChartOptions = (
	name: string,
	displayTitle: boolean = true
): ChartOptions<'doughnut'> => ({
	responsive: true,
	maintainAspectRatio: true,
	animation: {
		animateRotate: true,
		animateScale: true,
	},
	plugins: {
		legend: {
			position: 'top',
			display: false,
		},
		title: {
			display: displayTitle,
			text: name + ' Progress',
		},
	},
});

export function getProjectChartData(data: number[]): ChartData<'doughnut'> {
	return {
		labels: ['open', 'in Progress', 'done'],
		datasets: [
			{
				data: data,
				backgroundColor: useAppStore().darkMode
					? ['#333333', '#2134A2', '#339933']
					: ['#e5e7eb', '#60a5fa', '#55BB55'],
			},
		],
	};
}
