<template>
	<div
		class="absolute shadow-md dark:shadow-dark-400 bottom-9 h-20 w-20 right-0 flex justify-center items-center rounded-full m-5 transition-all cursor-pointer bg-gray-400 dark:bg-dark-100 hover:(bg-gray-200 shadow-gray-400 shadow-md) dark:hover:(bg-dark-400 shadow-dark-400 shadow-md)">
		<AppIcon v-if="icon">
			<slot></slot>
		</AppIcon>
		<slot v-else></slot>
	</div>
</template>
<script setup lang="ts">
import AppIcon from './AppIcon.vue';

defineProps({
	icon: { type: Boolean, default: true },
});
</script>
