<template>
	<div
		class="transition-all relative bg-gray-300 dark:bg-dark-100 rounded-md min-h-10 p-5"
		:class="markAsTarget ? 'border border-blue-500 bg-gray-200 dark:bg-dark-200' : ''"
		@drop="
			if (!disable) $emit('onDrop', $event.dataTransfer?.getData('data'));
			markAsTarget = false;
		"
		@dragenter="markAsTarget = true"
		@dragover.prevent>
		<slot></slot>
		<div
			@dragleave="markAsTarget = false"
			class="absolute w-full h-full top-0 left-0 z-99 flex items-center justify-center opacity-50"
			:class="markAsTarget ? 'visible ' + (disable ? 'bg-light-50 opacity-50' : '') : 'hidden'">
			<span class="text-dark-900 opacity-100" v-if="disable">Wip limit reached</span>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const markAsTarget = ref(false);

defineEmits(['onDrop']);

defineProps({
	disable: { type: Boolean, default: false },
});
</script>
