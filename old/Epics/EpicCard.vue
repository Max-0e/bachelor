<template>
	<div
		class="rounded-md p-5 shadow-lg relative cursor-pointer transition-all bg-gray-200 hover:bg-gray-300 dark:(bg-dark-400) dark:hover:(bg-dark-50)"
		@click="detailsModal!.open()">
		<div class="text-xl font-medium pt-3">
			{{ epic.name }}
		</div>
		<AppToolTip
			class="absolute top-0 right-0"
			text="delete Epic"
			position="right">
			<AppIcon
				class="px-2 m-1 hover:bg-light-900 dark:hover:bg-dark-400"
				@click.stop="deleteModal!.open()"
				>delete</AppIcon
			>
		</AppToolTip>
		<div class="h-100 w-100 mx-auto">
			<DoughnutChart
				:chartData="
					getProjectChartData([
						metrics.openTasksLength,
						metrics.inProgressTasksLength,
						metrics.doneTasksLength,
					])
				"
				:options="projectDoughnutChartOptions" />
		</div>
	</div>
	<AppModal ref="detailsModal" :large="true">
		<EpicDetails :project="project" :epic="epic" />
	</AppModal>
	<AppYesNoModal
		ref="deleteModal"
		@yes="
			projectStore.deleteEpic(project, epic);
			deleteModal!.close();
		">
		Delete Epic "{{ epic.name }}"?
	</AppYesNoModal>
</template>
<script setup lang="ts">
import AppYesNoModal from '@/components/shared/Modal/AppYesNoModal.vue';
import AppIcon from '@/components/shared/UI/AppIcon.vue';
import AppToolTip from '@/components/shared/UI/AppToolTip.vue';
import { IEpic } from '@/intefaces/epic.interface';
import { IProject } from '@/intefaces/project.interface';
import { useProjectStore } from '@/store/project';
import { PropType, toRefs } from 'vue';
import AppModal from '../shared/Modal/AppModal.vue';
import EpicDetails from './EpicDetails.vue';

import { DoughnutChart } from 'vue-chart-3';

import {
	getProjectChartData,
	projectDoughnutChartOptions,
} from '@/chartoptions/projectDoughnutChartOptions';
import { modalRef } from '@/intefaces/modal.interface';

const props = defineProps({
	epic: { type: Object as PropType<IEpic>, required: true },
	project: { type: Object as PropType<IProject>, required: true },
});

const deleteModal = modalRef();
const detailsModal = modalRef();

const projectStore = useProjectStore();

const refProps = toRefs(props);

const metrics = useProjectStore().computeMetricsForEpic(
	refProps.project,
	props.epic.id
);
</script>
