<template>
	<div
		class="absolute bottom-30 right-0 flex flex-col transform transition-all w-20 origin-bottom items-center m-5"
		:class="{ 'scale-0': !open }">
		<slot></slot>
	</div>
	<div
		class="ripple absolute shadow-md dark:shadow-dark-400 bottom-9 h-20 w-20 right-0 flex justify-center items-center rounded-full m-5 transition-all cursor-pointer bg-gray-400 dark:bg-dark-100 hover:(bg-gray-200 shadow-gray-400 shadow-md) dark:hover:(bg-dark-400 shadow-dark-400 shadow-md)"
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
