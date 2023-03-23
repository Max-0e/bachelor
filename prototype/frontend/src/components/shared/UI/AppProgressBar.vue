<template>
	<div class="grid border rounded-md border-dark-100 dark:border-white">
		<span class="gridArea z-2 text-black dark:text-white"
			><slot></slot>: {{ progress }}%</span
		>
		<div
			class="bg-successGreen rounded-md gridArea h-full w-full transition-all"
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
