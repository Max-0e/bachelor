<template>
	<AppLabel :for="name">{{ label }}</AppLabel>
	<div class="mx-5 mt-2 mb-5 relative rounded-md shadow-md">
		<input
			@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
			class="p-3 pl-7 pr-12 block w-full dark:bg-dark-50 sm:text-sm rounded-md border-1 border-gray-300 focus:(ring-blue-600 border-blue-600)"
			:type="type"
			:name="name"
			:id="id"
			:placeholder="placeholder" />
	</div>
</template>

<script setup lang="ts">
import AppLabel from '../shared/AppLabel.vue';

defineProps({
	label: String,
	type: String,
	name: String,
	id: String,
	placeholder: String,
	modelValue: String,
});
</script>
