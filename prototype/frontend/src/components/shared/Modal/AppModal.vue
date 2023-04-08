<template>
	<div
		@click.self="dismissible ? close() : ''"
		:class="isOpen ? 'bg-opacity-60' : 'invisible bg-opacity-0'"
		class="z-100 absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black transition-all">
		<div
			:class="{ 'modaloffset invisible': !isOpen, '!min-w-2/3': large }"
			class="dark:bg-dark-100 max-w-2/3 z-101 flex flex-wrap content-between gap-5 rounded-lg bg-white p-10 transition-all">
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const isOpen = ref(false);

const open = () => {
	isOpen.value = true;
	emit('opened');
};
const close = () => {
	isOpen.value = false;
	emit('closed');
};

defineProps({
	dismissible: { Type: Boolean, default: true },
	large: { Type: Boolean, default: false },
});

defineExpose({ open, close });

const emit = defineEmits<{ (e: 'opened'): void; (e: 'closed'): void }>();
</script>

<style scoped>
.modaloffset {
	transform: translate(0, 20px) scale(0);
}
</style>
