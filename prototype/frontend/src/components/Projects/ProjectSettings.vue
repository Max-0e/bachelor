<template>
	<div class="text-3xl text-left p-10">Project Settings</div>
	<div class="mt-10 text-2xl">
		<div>Wip-Limit:</div>
		<div class="flex justify-center items-center">
			<AppIcon
				@click="
					currentProject.wipLimit--;
					projectStore.updateProject(currentProject);
				"
				>remove</AppIcon
			>
			<Transition>
				<div>{{ currentProject.wipLimit }}</div>
			</Transition>
			<AppIcon
				@click="
					currentProject.wipLimit++;
					projectStore.updateProject(currentProject);
				"
				>add</AppIcon
			>
		</div>
	</div>
	<div class="mt-10">
		<AppButton :color="'red'" tooltip="delete project" tooltipPosition="left" @click="deleteModal!.open()">
			<div class="flex items-center justify-center">
				<AppIcon> delete </AppIcon>
				<span class="p-2"> Delete Project </span>
			</div>
		</AppButton>
	</div>
	<AppYesNoModal ref="deleteModal" @yes="projectStore.deleteCurrentProject()">
		Delete Project "{{ currentProject.name }}"?
	</AppYesNoModal>
</template>
<script setup lang="ts">
import { IProject } from '@/intefaces/project.interface';
import { useProjectStore } from '@/store/project';
import { PropType, ref } from 'vue';
import AppButton from '../shared/Input/AppButton.vue';
import AppYesNoModal from '../shared/Modal/AppYesNoModal.vue';
import AppIcon from '../shared/UI/AppIcon.vue';

const deleteModal = ref<InstanceType<typeof AppYesNoModal> | null>(null);

const projectStore = useProjectStore();

const currentProject = ref(projectStore.getCurrentProject);

defineProps({
	project: { type: Object as PropType<IProject>, required: true },
});
</script>
