<template>
	<div class="w-full">
		<div
			class="w-full bg-gray-400 max-h-10 dark:bg-dark-50 rounded-xl cursor-pointer flex justify-between flex-col items-strech transition-all"
			:class="{ 'pb-5 max-h-[1000000px]': expanded }">
			<div
				@click="expanded = !expanded"
				class="flex justify-between items-center px-5">
				<div>
					{{ triggerText }}
				</div>
				<AppIcon :class="expanded ? 'transform rotate-180' : ''">
					expand_more
				</AppIcon>
			</div>
			<div
				@click="$event.stopPropagation;"
				class="bg-gray-300 dark:bg-dark-200 p-2 mx-5 rounded-xl"
				v-if="expanded">
				<slot></slot>
			</div>
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
