<template>
	<div>Settings</div>
	<label for="toggle" class="flex items-center cursor-pointer relative mb-4">
		<input
			type="checkbox"
			id="toggle"
			class="sr-only"
			:checked="useAppStore().darkMode"
			@change="useAppStore().setDarkMode()" />
		<div
			class="toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full"></div>
		<span class="ml-3 text-sm font-medium">Dark-Mode</span>
	</label>
</template>
<script setup lang="ts">
import { useAppStore } from '@/store/app';
</script>
<style scoped>
.toggle-bg:after {
	content: '';
	@apply absolute top-0.5 left-0.5 bg-white border border-gray-300 rounded-full h-5 w-5 transition shadow-sm;
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
