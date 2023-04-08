<template>
	<div
		class="dark:bg-dark-100 relative rounded-md border border-transparent bg-gray-200 p-5 transition-all"
		:class="{ 'dark:bg-dark-200 !border-blue-500 bg-gray-200': markAsTarget }"
		@drop="
			if (!disable) $emit('onDrop', $event.dataTransfer?.getData('data'));
			markAsTarget = false;
		"
		@dragenter="markAsTarget = true"
		@dragover.prevent>
		<slot></slot>
		<div
			@dragleave="markAsTarget = false"
			class="z-99 absolute left-0 top-0 flex h-full w-full items-center justify-center opacity-50"
			:class="
				markAsTarget
					? 'visible ' + (disable ? 'bg-light-50 opacity-50' : '')
					: 'hidden'
			">
			<span class="text-dark-900 opacity-100" v-if="disable">{{
				disableMessage
			}}</span>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const markAsTarget = ref(false);

defineEmits(['onDrop']);

defineExpose({ markAsTarget });

defineProps({
	disable: { type: Boolean, default: false },
	disableMessage: String,
});
</script>
