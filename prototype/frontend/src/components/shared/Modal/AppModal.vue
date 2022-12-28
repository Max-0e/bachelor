<template>
	<div
		@click.self="dismissable ? close() : ''"
		:class="isOpen ? 'bg-opacity-60' : 'invisible bg-opacity-0'"
		class="transition-all bg-black absolute w-full h-full top-0 left-0 z-10 flex justify-center items-center">
		<div
			:class="isOpen ? '' : 'invisible modaloffset'"
			class="transition-all bg-white dark:bg-dark-100 max-w-2/3 z-50 p-10 flex flex-wrap content-between gap-5 rounded-lg">
			<slot></slot>
			<!-- (large ? ' max-w-5/6 max-h-5/6' : ' max-w-3/4 max-h-2/3') -->
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

const open = () => (isOpen.value = true);
const close = () => (isOpen.value = false);

defineProps({
	dismissable: { Type: Boolean, default: true },
	large: { Type: Boolean, default: false },
});

defineExpose({ open, close });
</script>

<style scoped>
.modaloffset {
	transform: translate(0, 20px) scale(0);
}
</style>
