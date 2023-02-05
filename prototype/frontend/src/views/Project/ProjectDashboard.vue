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
					@save="
						groupStore.updateEntity(currentProject!.id, currentProject!)
					" />
			</div>
			<AppToolTip text="Delete Project" position="left">
				<AppIcon @click="deteleProjectModal?.open()">delete</AppIcon>
			</AppToolTip>
		</div>
		<!-- <div>
			Tasks (done): {{ metrics.doneTasksLength }}<br />
			Progress: {{ metrics.progress }}%
		</div>
		<DoughnutChart
			:chartData="
				getProjectChartData([
					metrics.openTasksLength,
					metrics.inProgressTasksLength,
					metrics.doneTasksLength,
				])
			"
			:options="projectDoughnutChartOptions" />
		<div class="p-5">
			<AlternativeTaskList :project="currentProject" />
		</div>
		<div class="p-5">
			<AppCollapsible triggerText="Backlog">
				<AppTaskList :project="currentProject" />
			</AppCollapsible>
		</div> -->
	</div>
	<div v-else>Something went Wrong...</div>
	<AppYesNoModal ref="deteleProjectModal" @yes="deleteCurrentProject()">
		Delete this Project?
	</AppYesNoModal>
</template>
<script setup lang="ts">
import { modalRef } from '@/intefaces/modal.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';

// import { projectDoughnutChartOptions, getProjectChartData } from '@/chartoptions/projectDoughnutChartOptions';

const groupStore = useGroupStore();
const router = useRouter();

const currentProject = ref(groupStore.currentEntity);
const deteleProjectModal = modalRef();

function deleteCurrentProject() {
	groupStore.deleteEntity(currentProject.value!);
	router.push({ name: 'Projects' });
}

// const metrics = projectStore.computeMetricsForProject(currentProject);
</script>
