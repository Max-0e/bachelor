import { ChartData, ChartOptions } from "chart.js";
import { computed, Ref } from "vue";

export const projectDoughnutChartOptions: ChartOptions<'doughnut'> = ({
    responsive: true,
    maintainAspectRatio: false,
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
            text: 'Project Progress',
        },
    },
});

export function getProjectChartData (data: number[]): ChartData<'doughnut'>{
    return(
        {
            labels: ['open', 'in Progress', 'done'],
            datasets: [
                {
                    data: data,
                    backgroundColor: ['#333333', '#0079AF', '#339933'],
                },
            ],
        }
    );
}