<template>
	<div
		class="dark:shadow-dark-400 dark:bg-dark-100 hover:(bg-gray-400 shadow-md) dark:hover:(bg-dark-400 shadow-dark-400 shadow-md) absolute bottom-9 right-0 m-5 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gray-300 shadow-md shadow-gray-400 transition-all">
		<AppIcon v-if="icon">
			<slot></slot>
		</AppIcon>
		<slot v-else></slot>
	</div>
</template>
<script setup lang="ts">
defineProps({
	icon: { type: Boolean, default: true },
});
</script>
