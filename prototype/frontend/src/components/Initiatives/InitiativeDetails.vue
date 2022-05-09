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
					@click="deleteModalOpen = true">
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
			:open="deleteModalOpen"
			@yes="
				initiativeStore.deleteCurrentInitiative();
				deleteModalOpen = false;
			"
			@cancel="deleteModalOpen = false">
			Delete Initiative "{{ currentInitiative.name }}"?
		</AppYesNoModal>
		<div class="text-left ml-10 mt-10 text-xl font-bold">Projects</div>
		<div class="flex flex-wrap gap-10 p-5 m-5 border border-gray-300 dark:border-dark-50 rounded-lg">
			<div class="flex-grow flex" v-for="project in projectStore.getProjectsFromCurrentInitiative">
				<ProjectCard class="cursor-pointer w-9/10" :project="project" @click="router.push('/app/projects/' + project.id)" />
				<div class="w-1/10 px-2">
					<div
						class="cursor-pointer w-full h-full flex justify-center shadow-md items-center rounded-md bg-gray-200 hover:bg-gray-300 dark:bg-dark-400 dark:hover:bg-dark-600"
						@click="removeProjectModalOpen = true">
						<AppIcon>more_vert</AppIcon>
					</div>
				</div>
				<AppYesNoModal
					:open="removeProjectModalOpen"
					@yes="
						initiativeStore.removeProjectFromCurrentInitiative(project);
						removeProjectModalOpen = false;
					"
					@cancel="removeProjectModalOpen = false">
					Remove Project "{{ project.name }}" from Initiative "{{ currentInitiative.name }}"?
				</AppYesNoModal>
			</div>
		</div>

		<AppFloatingActionButton @click="showAddProjectToInitiativeModal = true" :icon="true">add</AppFloatingActionButton>
		<AppModal :open="showAddProjectToInitiativeModal">
			<div class="font-bold text-xl w-full text-left">Add Project to Initiative</div>
			<div class="w-full">
				<form>
					<div>
						<select class="bg-dark-400 w-1/2" name="project" id="project" v-model="selectedProject">
							<option
								:value="project"
								v-for="project in projectStore.projects.filter(
									(projectFromState) => !projectStore.getProjectsFromCurrentInitiative.includes(projectFromState)
								)">
								{{ project.name }}
							</option>
						</select>
					</div>
				</form>
			</div>
			<div class="w-full flex justify-end gap-5">
				<AppButton color="red" @click="showAddProjectToInitiativeModal = false">Cancel</AppButton>
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
import AppModal from '@/components/shared/AppModal.vue';
import AppYesNoModal from '@/components/shared/AppYesNoModal.vue';
import AppButton from '@/components/shared/AppButton.vue';
import AppFloatingActionButton from '@/components/shared/AppFloatingActionButton.vue';
import AppInlineInputField from '@/components/shared/AppInlineInputField.vue';
import { useInitiativeStore } from '@/store/initiatives';
import AppIcon from '../shared/AppIcon.vue';

const projectStore = useProjectStore();
const initiativeStore = useInitiativeStore();

const showAddProjectToInitiativeModal = ref(false);
const removeProjectModalOpen = ref(false);
const deleteModalOpen = ref(false);

const selectedProject = ref(null);

const currentInitiative = ref(initiativeStore.getCurrentInitiative);

const metrics = ref(useInitiativeStore().getMetrics(projectStore.getProjectsFromCurrentInitiative));

function updateInitiative() {
	if (!!currentInitiative.value) initiativeStore.updateInitiative(currentInitiative.value);
}

function addProjectToInitiative() {
	if (!!currentInitiative.value && !!selectedProject.value) {
		initiativeStore.addProjectToInitiative(currentInitiative.value, selectedProject.value);
		showAddProjectToInitiativeModal.value = false;
	} else {
		// TODO do some stuff here;
	}
}
</script>
