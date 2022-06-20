<template>
	Dashboard
<div class="text-left">
	Objectives
</div>
<div class="p-10 flex gap-5">
	<div v-for="objective in objectives" ref="objectiveRefs" class="h-50 w-100 flex justify-center items-center text-xl bg-dark-600 rounded-md">
		{{objective.name}}
	</div>
</div>
<div class="text-left">
	Initiatives
</div>
<div class="p-10 flex gap-5">
	<div ref="initiativeRefs" v-for="initiative in initiativeStore.initiatives" class="h-50 w-100 flex justify-center items-center text-xl bg-dark-600 rounded-md">
		{{initiative.name}}
	</div>
</div>
<div class="text-left">
	Projects
</div>
<div class="p-10 flex gap-5">
	<div ref="projectsRefs" v-for="project in projectStore.projects" class="h-50 w-100 flex justify-center items-center text-xl bg-dark-600 rounded-md">
		{{project.name}}
	</div>
</div>
<div ref="blubRef" @click="blub()">blub</div>
</template>
<script setup lang="ts">
import { useInitiativeStore } from '@/store/initiatives';
import { useObjectiveStore } from '@/store/objectives';
import { useProjectStore } from '@/store/project';
import { onMounted, ref } from 'vue';

const objectiveStore = useObjectiveStore();
const initiativeStore = useInitiativeStore();
const projectStore = useProjectStore();

const objectives = ref(objectiveStore.objectives)

const objectiveRefs = ref<InstanceType<typeof HTMLDivElement>[]>([]);
const initiativeRefs = ref<InstanceType<typeof HTMLDivElement>[]>([]);
const projectsRefs = ref<InstanceType<typeof HTMLDivElement>[]>([]);


const blubRef = ref<InstanceType<typeof HTMLDivElement>>();

const blub = () => {
	console.log(blubRef.value?.getBoundingClientRect())
}

onMounted(() => console.log(objectiveRefs.value));
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
