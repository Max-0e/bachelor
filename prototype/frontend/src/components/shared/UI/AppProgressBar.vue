<template>
	<div class="border-dark-100 grid rounded-md border dark:border-white">
		<span class="gridArea z-2 text-gray-600 dark:text-white"
			><slot></slot>: {{ progress }}%</span
		>
		<div
			class="bg-successGreen dark:bg-successGreenDark gridArea h-full w-full rounded-md transition-all"
			:style="`width:${progress}%`"></div>
	</div>
</template>
<script lang="ts" setup>
defineProps({
	progress: { Types: Number, required: true },
});
</script>
<style scoped>
.gridArea {
	/* Place on top of each other */
	grid-area: 1 / 1 / 2 / 2;
}
</style>
