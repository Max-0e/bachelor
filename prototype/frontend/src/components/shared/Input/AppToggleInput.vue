<template>
	<label for="toggle" class="flex items-center cursor-pointer relative">
		<input
			type="checkbox"
			id="toggle"
			class="sr-only"
			:checked="initialValue"
			@change="$emit('change')" />
		<div
			class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full after:(absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition shadow-sm)"></div>
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
	@apply bg-gray-600 border-gray-600;
}
label {
	width: fit-content;
}
</style>
