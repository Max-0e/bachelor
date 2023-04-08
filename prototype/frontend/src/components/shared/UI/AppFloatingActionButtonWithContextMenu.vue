<template>
	<div
		class="bottom-30 absolute right-0 m-5 flex w-20 origin-bottom transform flex-col items-center transition-all"
		:class="{ 'scale-0': !open }">
		<slot></slot>
	</div>
	<div
		class="ripple dark:shadow-dark-400 dark:bg-dark-100 hover:(bg-gray-200 shadow-md) dark:hover:(bg-dark-400 shadow-dark-400 shadow-md) absolute bottom-9 right-0 m-5 flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-gray-400 shadow-md shadow-gray-400 transition-all"
		@click="open = !open">
		<AppIcon
			class="transform transition-all"
			:class="{ '-rotate-[135deg]': open }">
			add
		</AppIcon>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const open = ref(false);
</script>
