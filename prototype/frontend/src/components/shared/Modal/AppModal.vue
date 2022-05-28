<template>
	<div
		:class="open ? 'bg-opacity-60' : 'invisible bg-opacity-0'"
		class="transition-all bg-black absolute w-full h-full top-0 left-0 z-10 flex justify-center items-center">
		<div
			:class="open ? '' : 'invisible modaloffset'"
			class="transition-all bg-white dark:bg-dark-100 max-w-2/3 z-50 p-10 flex flex-wrap content-between gap-5 rounded-lg">
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
defineProps({ open: Boolean });
</script>

<style scoped>
.modaloffset {
	transform: translate(0, 20px) scale(0);
}
</style>
