<template>
	<div
		class="flex items-center gap-10 p-10 bg-dark-500 m-10 text-left rounded-md"
		v-for="level in store.entities">
		<div class="w-1/3 text-3xl font-bold">{{ level.name }}</div>
		<div class="w-1/3 text-3xl">{{ level.hirarchyLevel }}</div>
		<AppButton class="w-1/3" @click="update(level.id, level)">Update</AppButton>
		<AppButton class="w-1/3" @click="store.deleteEntity(level)"
			>Delete</AppButton
		>
	</div>
</template>
<script lang="ts" setup>
import { EntityCreate } from '@/intefaces/entity.interface';
import { ILevel } from '@/intefaces/level.interface';
import { useLevelStore } from '@/store/level.store';

const store = useLevelStore();

function update(levelId: string, level: EntityCreate<ILevel>) {
	level.name = 'x';
	store.updateEntity(levelId, level);
}
</script>
