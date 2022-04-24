<template>
<div class="flex flex-wrap gap-10">
    <ProjectCard class="cursor-pointer flex-grow" @click="showCreateProjectModal=true"></ProjectCard>
    <ProjectCard class="cursor-pointer flex-grow" v-for="project in projectStore.projects" :project="project" @click="router.push('/projects/' + project._id)"></ProjectCard>
</div>
<AppModal :open="showCreateProjectModal">
<div class="font-bold text-xl w-full text-left">Create new Project</div>
<div class="w-full">
    <form>
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
    <AppButton @click="showCreateProjectModal=false">Cancel</AppButton>
    <AppButton @click="projectStore.createProject(projectToCreate);showCreateProjectModal=false">Create</AppButton>
</div>
</AppModal>
</template>

<script setup lang="ts">
import { useProjectStore } from '@/store/project';
import ProjectCard from '@/components/Projects/Projects-Components/ProjectCard.vue';
import AppModal from '@/components/shared/AppModal.vue'
import AppButton from '@/components/shared/AppButton.vue';
import AppInputField from '@/components/shared/AppInputField.vue';
import { ICreateProject } from '@/intefaces/project.interface';
import { ref, Ref } from 'vue';
import router from '@/router';

const showCreateProjectModal = ref(false);
const projectToCreate: Ref<ICreateProject> = ref({ name: "" });
const projectStore = useProjectStore();

</script>