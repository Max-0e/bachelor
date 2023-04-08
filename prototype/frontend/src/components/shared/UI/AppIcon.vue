<template>
	<div
		class="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full transition-all"
		:class="{
			'hover:bg-light-900 dark:hover:bg-dark-400 m-1 px-2': button,
			'bg-light-600 dark:bg-dark-700 m-1 px-2': withBackground,
		}">
		<span class="material-icons" :class="{ '!text-4xl': large }"
			><slot></slot
		></span>
	</div>
</template>
<script setup lang="ts">
defineProps({
	button: Boolean,
	withBackground: Boolean,
	large: Boolean,
});
</script>
<style scoped></style>
