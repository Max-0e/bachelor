<template>
	<div
		class="flex items-center justify-between p-10 bg-gray-200 dark:bg-dark-500 m-10 text-left rounded-md"
		v-for="level in store.entities">
		<div class="w-1/3 text-3xl font-bold">{{ level.name }}</div>
		<div class="w-1/3 text-3xl">{{ level.hirarchyLevel }}</div>
		<AppToolTip text="Delete Level" position="top">
			<AppIcon class="w-1/3" @click="store.deleteEntity(level)">delete</AppIcon>
		</AppToolTip>
	</div>
	<div v-if="store.entities.length === 0">no levels</div>
</template>
<script lang="ts" setup>
import { useLevelStore } from '@/store/level.store';

const store = useLevelStore();
</script>
