<template>
<div class="flex justify-between">
    <div class="text-2xl w-1/2">
        <AppInlineInputField
            v-model="currentProject.name"
            type="text"
            name="name"
            id="name"
            placeholder="Project-Name"
            label="Project-Name"
            @save="updateCurrentProject()" />
    </div>
    <div>
        <AppButton :color="'red'" :iconButton="true" @click="deleteModalOpen=true">
            delete
        </AppButton>
    </div>
</div>
<AppYesNoModal :open="deleteModalOpen" @yes="deleteCurrentProject(); deleteModalOpen=false" @cancel="deleteModalOpen=false">
Delete Project "{{ currentProject.name }}"?
</AppYesNoModal>
</template>
<script setup lang="ts">
import router from '@/router';
import projectService from '@/services/project.service';
import { useProjectStore } from '@/store/project';
import { ref } from 'vue';
import AppButton from '../shared/AppButton.vue';
import AppInlineInputField from '../shared/AppInlineInputField.vue';
import AppYesNoModal from '../shared/AppYesNoModal.vue';

const deleteModalOpen = ref(false);

const projectStore = useProjectStore();

const currentProject = ref(projectStore.currentProject);

function updateCurrentProject () {
    projectService.updateProject(currentProject.value._id, { name: currentProject.value.name }).then(project => {
        projectStore.updateProject(project);
    })
}

function deleteCurrentProject() {
    projectService.deleteProject(currentProject.value).then(_ => {
        projectStore.projects = projectStore.projects.filter(project => project._id !== projectStore.currentProject._id);
        router.push('/projects');
    })
}
</script>