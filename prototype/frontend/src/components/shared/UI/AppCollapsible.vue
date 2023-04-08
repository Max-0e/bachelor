<template>
	<div class="w-full">
		<div
			class="dark:bg-dark-50 items-strech flex max-h-10 w-full cursor-pointer flex-col justify-between rounded-xl bg-gray-200 transition-all"
			:class="{ 'max-h-[1000000px] pb-5': expanded }">
			<div
				@click="expanded = !expanded"
				class="flex items-center justify-between px-5">
				<div>
					{{ triggerText }}
				</div>
				<AppIcon :class="expanded ? 'rotate-180 transform' : ''">
					expand_more
				</AppIcon>
			</div>
			<div
				@click.stop=""
				class="dark:bg-dark-200 mx-5 rounded-xl bg-gray-100 p-2"
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
