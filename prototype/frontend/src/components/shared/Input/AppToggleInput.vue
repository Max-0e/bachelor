<template>
	<label for="toggle" class="relative flex cursor-pointer items-center">
		<input
			type="checkbox"
			id="toggle"
			class="sr-only"
			:checked="initialValue"
			@change="$emit('change')" />
		<div
			class="toggle-bg after:(absolute shadow-sm) left-0.5 top-0.5 h-5 h-6 w-11 w-5 rounded-full rounded-full border border-2 border-gray-200 border-gray-300 bg-gray-200 bg-white transition"></div>
		<span class="ml-3 text-sm font-medium">{{ label }}</span>
	</label>
</template>
<script setup lang="ts">
defineProps({
	initialValue: { type: Boolean, required: true },
	label: { type: String, required: true },
});
defineEmits(['change']);
</script>
<style scoped>
.toggle-bg:after {
	content: '';
}

input:checked + .toggle-bg:after {
	transform: translateX(100%);
	@apply border-white;
}

input:checked + .toggle-bg {
	@apply border-gray-600 bg-gray-600;
}
label {
	width: fit-content;
}
</style>
