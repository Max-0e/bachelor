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
			<!-- <DoughnutChart
				:chartData="
					getProjectChartData([
						metrics.openTasksLength,
						metrics.inProgressTasksLength,
						metrics.doneTasksLength,
					])
				"
				:options="projectDoughnutChartOptions" /> -->
		</div>
	</div>
	<AppModal ref="detailsModal" :large="true">
		<EpicDetails :project="project" :epic="epic" />
	</AppModal>
	<AppYesNoModal
		ref="deleteModal"
		@yes="
			groupStore.deleteEntity(epic);
			deleteModal!.close();
		">
		Delete Epic "{{ epic.name }}"?
	</AppYesNoModal>
</template>
<script setup lang="ts">
import { EntityGroup } from '@/interfaces/entity-groups.interface';
import { modalRef } from '@/interfaces/modal.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { PropType } from 'vue';

const groupStore = useGroupStore();

defineProps({
	epic: { type: Object as PropType<EntityGroup>, required: true },
	project: { type: Object as PropType<EntityGroup>, required: true },
});

const deleteModal = modalRef();
const detailsModal = modalRef();
</script>
