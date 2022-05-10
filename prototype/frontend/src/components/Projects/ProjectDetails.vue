<template>
	<div v-if="!!currentProject">
		<div class="flex justify-between m-5">
			<div class="text-2xl w-1/2">
				<AppInlineInputField
					class="mr-5 mt-2 mb-5"
					v-model="currentProject.name"
					type="text"
					name="name"
					id="name"
					placeholder="Project-Name"
					label="Project-Name"
					@save="projectStore.updateProject(currentProject!)" />
			</div>
			<div>
				<AppButton
					:color="'red'"
					:iconButton="true"
					tooltip="delete project"
					tooltipPosition="left"
					@click="deleteModalOpen = true">
					delete
				</AppButton>
			</div>
		</div>
		<DoughnutChart :chartData="getProjectChartData(
				[
					currentProject.tasks.filter((task) => task.status === Status.open).length,
					currentProject.tasks.filter((task) => task.status === Status.inProgress).length,
					currentProject.tasks.filter((task) => task.status === Status.done).length
				]
			)" :options="projectDoughnutChartOptions" />
		<div class="p-5">
			<AlternativeTaskList :project="currentProject"/>
		</div>
		<div class="p-5">
			<AppCollapsible triggerText="Backlog">
				<AppTaskList :project="currentProject" />
			</AppCollapsible>
		</div>
		<AppYesNoModal
			:open="deleteModalOpen"
			@yes="
				projectStore.deleteCurrentProject();
				deleteModalOpen = false;
			"
			@cancel="deleteModalOpen = false">
			Delete Project "{{ currentProject.name }}"?
		</AppYesNoModal>
	</div>
	<div v-else>Something went Wrong...</div>
</template>
<script setup lang="ts">
import { useProjectStore } from '@/store/project';
import { ref } from 'vue';
import AppButton from '../shared/AppButton.vue';
import AppInlineInputField from '../shared/AppInlineInputField.vue';
import AppYesNoModal from '../shared/AppYesNoModal.vue';
import AppTaskList from '../Tasks/TaskList.vue';
import AlternativeTaskList from '../Tasks/AlternativeTaskList.vue';
import AppCollapsible from '../shared/AppCollapsible.vue';

import { DoughnutChart } from 'vue-chart-3';

import { projectDoughnutChartOptions, getProjectChartData } from '@/chartoptions/projectDoughnutChartOptions'
import { Status } from '@/intefaces/task.interface';

const deleteModalOpen = ref(false);

const projectStore = useProjectStore();

const currentProject = ref(projectStore.getCurrentProject);
</script>
