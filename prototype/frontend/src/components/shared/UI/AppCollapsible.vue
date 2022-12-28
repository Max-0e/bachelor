<template>
	<div class="w-full">
		<div
			class="w-full bg-gray-400 dark:bg-dark-50 rounded-xl cursor-pointer flex justify-between items-center px-5"
			@click="expanded = !expanded">
			<div>
				{{ triggerText }}
			</div>
			<AppIcon :class="expanded ? 'transform rotate-180' : ''">
				expand_more
			</AppIcon>
		</div>
		<!-- TODO why cant u animate display none -->
		<div
			class="w-full bg-gray-300 dark:bg-dark-200 p-2 transform transition-all scale-y-0 origin-top"
			:class="expanded ? 'transform-none' : 'hidden'">
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const expanded = ref(false);

defineProps({
	triggerText: { String, required: true },
});
</script>
<style></style>
