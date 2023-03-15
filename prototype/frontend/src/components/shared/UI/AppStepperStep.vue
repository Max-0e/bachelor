<template>
	<div
		class="w-full transition-all"
		:class="{ 'opacity-0': step !== currentStep }">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
defineProps({
	step: { type: Number, required: true },
	currentStep: { type: Number, required: true },
});
</script>
