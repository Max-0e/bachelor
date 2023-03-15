<template>
	<div class="overflow-x-hidden" :class="{ 'min-h-60': minHeight }">
		<div
			class="flex transition-all"
			:style="
				'transform: translate(-' +
				100 * ((step - 1) / numberOfSteps) +
				'%); width: ' +
				numberOfSteps +
				'00%' +
				';'
			">
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
defineProps({
	minHeight: Boolean,
	step: { type: Number, default: 1 },
	numberOfSteps: { type: Number, required: true },
});
</script>
<style scoped></style>
