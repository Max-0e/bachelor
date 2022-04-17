<template>
	<button
		type="button"
		:class="`px-8 py-3 text-md text-white font-semibold rounded-md transition border bg-${color}-400 border-${color}-500 hover:shadow-md hover:ring-${color}-600 focus:outline-none focus:ring-2 focus:ring-offset-2`">
		<slot v-if="!iconButton"></slot>
		<div v-else class="flex">
                <span class="material-icons"><slot></slot></span>
        </div>
	</button>
</template>
<script setup lang="ts">
defineProps({
	color: { type: String, default: "blue" },
	iconButton: Boolean,
})
</script>
<style scoped>
</style>