<template>
	<div v-if="!!currentProject">
		<div class="flex justify-between">
			<div class="text-2xl w-1/2">
				<AppInlineInputField
					class="mx-5 mt-2 mb-5 p-5"
					v-model="currentProject.name"
					type="text"
					name="name"
					id="name"
					placeholder="Project-Name"
					label="Project-Name"
					@save="projectStore.updateProject(currentProject)" />
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
		<AppTaskList :project="currentProject" />
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

const deleteModalOpen = ref(false);

const projectStore = useProjectStore();

const currentProject = ref(projectStore.getCurrentProject);
</script>
