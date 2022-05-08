<template>
	<AppToolTip :text="tooltip" :position="tooltipPosition" >
		<button
			type="button"
			class="text-md text-white font-semibold rounded-md transition border hover:shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2"
			:class="`px-8 ${slim ? 'py-1' : 'py-3'} bg-${color}-400 border-${color}-500  hover:ring-${color}-600 dark:bg-${color}-900`">
			<slot v-if="!iconButton"></slot>
			<div v-else class="flex">
				<span class="material-icons"><slot></slot></span>
			</div>
		</button>
	</AppToolTip>
</template>
<script setup lang="ts">
import AppToolTip from './AppToolTip.vue';
defineProps({
	color: { type: String, default: 'blue' },
	iconButton: Boolean,
	slim: Boolean,
	tooltip: String,
	tooltipPosition: String
});
</script>
<style scoped></style>
