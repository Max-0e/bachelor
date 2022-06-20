<template>
	Dashboard
	<div class="text-left">Objectives</div>
	<div class="p-10 flex gap-5">
		<div
			v-for="objective in objectives"
			ref="objectiveRefs"
			class="h-50 w-100 transition-all flex justify-center items-center text-xl bg-dark-600 rounded-md"
			@mouseenter="markObjective(objective)"
			@mouseleave="unmark()"
			:class="markedObjective === objective || markedObjectives?.includes(objective) ? 'bg-dark-100' : ''">
			{{ objective.name }}
		</div>
	</div>
	<div class="text-left">Initiatives</div>
	<div class="p-10 flex gap-5">
		<div
			ref="initiativeRefs"
			v-for="initiative in initiativeStore.initiatives"
			class="h-50 w-100 transition-all flex justify-center items-center text-xl bg-dark-600 rounded-md"
			@mouseenter="markInitiative(initiative)"
			@mouseleave="unmark()"
			:class="markedInitiative === initiative || markedInitiatives?.includes(initiative) ? 'bg-dark-100' : ''">
			{{ initiative.name }}
		</div>
	</div>
	<div class="text-left">Projects</div>
	<div class="p-10 flex gap-5">
		<div
			ref="projectsRefs"
			v-for="project in projectStore.projects"
			class="transition-all rounded-md flex-grow p-1"
			@mouseenter="markProject(project)"
			@mouseleave="unmark()"
			:class="markedProject === project || markedProjects?.includes(project) ? 'border border-5 border-blue-500' : ''">
			<ProjectCard
				class="cursor-pointer"
				:key="project.name"
				:light="true"
				:project="project"
				@click="router.push('/app/projects/' + project.id)" />
		</div>
	</div>
	<!-- <div ref="blubRef" @click="blub()">blub</div> -->
</template>
<script setup lang="ts">
import { IInitiative } from '@/intefaces/initiative.interface';
import { IObjective } from '@/intefaces/objective.interface';
import { IProject } from '@/intefaces/project.interface';
import router from '@/router';
import { useInitiativeStore } from '@/store/initiatives';
import { useObjectiveStore } from '@/store/objectives';
import { useProjectStore } from '@/store/project';
import { onMounted, ref } from 'vue';
import ProjectCard from '../Projects/Projects-Components/ProjectCard.vue';

const objectiveStore = useObjectiveStore();
const initiativeStore = useInitiativeStore();
const projectStore = useProjectStore();

const objectives = ref(objectiveStore.objectives);

const markedObjective = ref<IObjective | IObjective[] | null>(null);
const markedObjectives = ref<IObjective[] | null>(null);
const markedInitiative = ref<IInitiative | null>(null);
const markedInitiatives = ref<IInitiative[] | null>(null);
const markedProject = ref<IProject | null>(null);
const markedProjects = ref<IProject[] | null>(null);

function markObjective(objective: IObjective) {
	markedObjective.value = objective;
	markedInitiatives.value = objective.initiatives.map(
		(initiativeid) => initiativeStore.initiatives.find((initiative) => initiativeid === initiative.id)!
	);
	markedProjects.value = markedInitiatives.value.flatMap((initiative) =>
		projectStore.projects.filter((project) => initiative.projects.includes(project.id))
	);
}

function markInitiative(initiative: IInitiative) {
	markedInitiative.value = initiative;
	markedObjectives.value = objectives.value.filter((objective) =>
		objective.initiatives.find((i) => i === initiative.id)
	);
	markedProjects.value = projectStore.projects.filter((project) => initiative.projects.includes(project.id));
}

function markProject(project: IProject) {
	markedProject.value = project;
	markedInitiatives.value = initiativeStore.initiatives.filter((initiative) =>
		initiative.projects.find((p) => p === project.id)
	);
	markedObjectives.value = objectives.value.filter((objective) =>
		objective.initiatives.find((initiativeId) =>
			markedInitiatives.value?.find((initiative) => initiativeId === initiative.id)
		)
	);
}

function unmark() {
	markedObjective.value = null;
	markedInitiative.value = null;
	markedProject.value = null;
	markedObjectives.value = null;
	markedInitiatives.value = null;
	markedProjects.value = null;
}

// const objectiveRefs = ref<InstanceType<typeof HTMLDivElement>[]>([]);
// const initiativeRefs = ref<InstanceType<typeof HTMLDivElement>[]>([]);
// const projectsRefs = ref<InstanceType<typeof HTMLDivElement>[]>([]);

// const blubRef = ref<InstanceType<typeof HTMLDivElement>>();

// const blub = () => {
// 	console.log(blubRef.value?.getBoundingClientRect())
// }

// onMounted(() => console.log('objectiveRefs', objectiveRefs.value));
</script>

<!-- <script lang="ts" setup>
import { ref, onMounted } from 'vue'

const list = ref([1, 2, 3])

const itemRefs = ref([])

onMounted(() => {
  console.log(itemRefs.value.map(i => (i as any).getBoundingClientRect().y))
})
</script>

<template>
  <div ref="itemRefs" v-for="item in list">
    {{ item }}
  </div>
</template> -->
