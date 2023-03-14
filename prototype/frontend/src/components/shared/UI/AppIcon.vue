<template>
	<div
		class="flex cursor-pointer w-10 h-10 justify-center items-center transition-all rounded-full"
		:class="{
			'px-2 m-1 hover:bg-light-900 dark:hover:bg-dark-400': button,
			'px-2 m-1 bg-light-600 dark:bg-dark-700': withBackground,
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
