<template>
	<div class="flex flex-wrap gap-5">
		<TransitionGroup>
			<ProjectCard
				class="cursor-pointer flex-grow"
				:key="project.name"
				v-for="project in projectStore.projects"
				:project="project"
				@click="router.push('/app/projects/' + project.id)" />
		</TransitionGroup>
	</div>
	<AppFloatingActionButton @click="showCreateProjectModal = true" :icon="true">add</AppFloatingActionButton>
	<AppModal :open="showCreateProjectModal">
		<div class="font-bold text-xl w-full text-left">Create new Project</div>
		<div class="w-full">
			<form
			@keydown.enter="
				projectStore.createProject(projectToCreate);
				clearFormField();
				showCreateProjectModal = false;
			">
				<div>
					<AppInputField
						v-model="projectToCreate.name"
						type="text"
						name="name"
						id="name"
						placeholder="Project-Name"
						label="Project-Name" />
				</div>
			</form>
		</div>
		<div class="w-full flex justify-end gap-5">
			<AppButton color="red" @click="showCreateProjectModal = false">Cancel</AppButton>
			<AppButton
				@click="
					projectStore.createProject(projectToCreate);
					clearFormField();
					showCreateProjectModal = false;
				"
				>Create</AppButton
			>
		</div>
	</AppModal>
</template>

<script setup lang="ts">
import { useProjectStore } from '@/store/project';
import ProjectCard from '@/components/Projects/Projects-Components/ProjectCard.vue';
import AppModal from '@/components/shared/Modal/AppModal.vue';
import AppButton from '@/components/shared/Input/AppButton.vue';
import AppFloatingActionButton from '@/components/shared/UI/AppFloatingActionButton.vue';
import AppInputField from '@/components/shared/Input/AppInputField.vue';
import { ICreateProject } from '@/intefaces/project.interface';
import { ref, Ref } from 'vue';
import router from '@/router';

const showCreateProjectModal = ref(false);
const projectToCreate: Ref<ICreateProject> = ref({ name: '' });
const projectStore = useProjectStore();

function clearFormField() {
	projectToCreate.value.name = '';
}
</script>
