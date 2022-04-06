<template>
<div class="flex flex-wrap gap-10">
    <ProjectCard></ProjectCard>
    <ProjectCard v-for="project in projectStore.projects" :project="project"></ProjectCard>
</div>
    <!-- <div v-for="project in projectStore.projects"> {{project.name}} </div> -->
</template>

<script setup lang="ts">
import { useProjectStore } from '@/store/project';
import ProjectCard from '@/components/Projects/Projects-Components/ProjectCard.vue';

const projectStore = useProjectStore();

</script>