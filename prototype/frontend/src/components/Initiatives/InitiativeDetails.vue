<template>
	<div v-if="!!currentInitiative">
		<div class="flex justify-between m-5">
			<div class="text-2xl w-1/2">
				<AppInlineInputField
					class="mx-5 mt-2 mb-5 p-5"
					v-model="currentInitiative.name"
					type="text"
					name="name"
					id="name"
					placeholder="Project-Name"
					label="Project-Name"
					@save="updateInitiative()" />
			</div>
			<div>
				<AppButton
					:color="'red'"
					:iconButton="true"
					tooltip="delete initiative"
					tooltipPosition="left"
					@click="deleteModal!.open()">
					delete
				</AppButton>
			</div>
		</div>
		<div class="text-xl p-10 m-5 border border-gray-300 dark:border-dark-50 rounded-lg">
			<div>
				Average Project Progress: <span class="text-blue-400">{{ metrics.averageProjectProgress }}%</span>
			</div>
			<div>
				Total Progress: <span class="text-blue-400">{{ metrics.totalProgress }}%</span>
			</div>
		</div>
		<AppYesNoModal
			ref="deleteModal"
			@yes="
				initiativeStore.deleteCurrentInitiative();
				deleteModal!.open();
			"
			@cancel="deleteModal!.close()">
			Delete Initiative "{{ currentInitiative.name }}"?
		</AppYesNoModal>
		<div class="text-left ml-10 mt-10 text-xl font-bold">Projects</div>
		<div class="flex flex-wrap gap-10 p-5 m-5 border border-gray-300 dark:border-dark-50 rounded-lg">
			<div class="flex-grow flex" v-for="project in projectStore.getProjectsFromCurrentInitiative">
				<ProjectCard
					class="cursor-pointer w-9/10"
					:project="project"
					@click="router.push('/app/projects/' + project.id)" />
				<div class="w-1/10 px-2">
					<div
						class="cursor-pointer w-full h-full flex justify-center shadow-md items-center rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-dark-400 dark:hover:bg-dark-600"
						@click="
							projectToRemove = project;
							removeProjectModal!.open();
						">
						<AppIcon>more_vert</AppIcon>
					</div>
				</div>
			</div>
		</div>
		<AppYesNoModal
			ref="removeProjectModal"
			@yes="
				initiativeStore.removeProjectFromCurrentInitiative(projectToRemove!);
				removeProjectModal!.close();
			">
			Remove Project "{{ projectToRemove?.name }}" from Initiative "{{ currentInitiative.name }}"?
		</AppYesNoModal>

		<AppFloatingActionButton @click="addProjectToInitiativeModal!.open()" :icon="true">add</AppFloatingActionButton>
		<AppModal ref="addProjectToInitiativeModal">
			<div class="font-bold text-xl w-full text-left">Add Project to Initiative</div>
			<div class="w-full">
				<form>
					<AppDropDownMenu
						v-model="selectedProject"
						selectText="select Project"
						:options="
							projectStore.projects
								.filter((projectFromState) => !projectStore.getProjectsFromCurrentInitiative.includes(projectFromState))
								.map((project) => ({ name: project.name, value: project }))
						" />
				</form>
			</div>
			<ProjectCard v-if="selectedProject != null" :project="selectedProject"></ProjectCard>
			<div class="w-full flex justify-end gap-5">
				<AppButton color="red" @click="addProjectToInitiativeModal!.close()">Cancel</AppButton>
				<AppButton @click="addProjectToInitiative()">Add</AppButton>
			</div>
		</AppModal>
	</div>
	<div v-else>Something went wrong ...</div>
</template>
<script setup lang="ts">
import router from '@/router';
import { useProjectStore } from '@/store/project';
import { ref } from 'vue';

import ProjectCard from '@/components/Projects/Projects-Components/ProjectCard.vue';
import AppModal from '@/components/shared/Modal/AppModal.vue';
import AppYesNoModal from '@/components/shared/Modal/AppYesNoModal.vue';
import AppButton from '@/components/shared/Input/AppButton.vue';
import AppDropDownMenu from '@/components/shared/Input/AppDropDownMenu.vue';
import AppFloatingActionButton from '@/components/shared/UI/AppFloatingActionButton.vue';
import AppInlineInputField from '@/components/shared/Input/AppInlineInputField.vue';
import { useInitiativeStore } from '@/store/initiatives';
import AppIcon from '../shared/UI/AppIcon.vue';
import { computed, Ref } from '@vue/reactivity';
import { IProject } from '@/intefaces/project.interface';

const projectStore = useProjectStore();
const initiativeStore = useInitiativeStore();

const addProjectToInitiativeModal = ref<InstanceType<typeof AppModal> | null>(null);
const removeProjectModal = ref<InstanceType<typeof AppYesNoModal> | null>(null);
const deleteModal = ref<InstanceType<typeof AppYesNoModal> | null>(null);

const selectedProject: Ref<IProject | null> = ref(null);
const projectToRemove: Ref<IProject | null> = ref(null);

const currentInitiative = ref(initiativeStore.getCurrentInitiative);

const metrics = computed(() => useInitiativeStore().getMetrics(projectStore.getProjectsFromCurrentInitiative));

function updateInitiative() {
	if (!!currentInitiative.value) initiativeStore.updateInitiative(currentInitiative.value);
}

function addProjectToInitiative() {
	if (!!selectedProject.value) {
		initiativeStore.addProjectToInitiative(currentInitiative.value, selectedProject.value);
		addProjectToInitiativeModal.value!.close();
		selectedProject.value = null;
	} else {
		// TODO do some stuff here;
	}
}
</script>
