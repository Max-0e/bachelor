<template>
	<div>
		<div class="itemForToolTip relative">
			<div class="my-auto w-full">
				<slot></slot>
			</div>
			<div
				v-if="!!text"
				class="toolTip dark:bg-dark-800 origin absolute z-50 mx-auto h-10 w-40 rounded-md bg-gray-200 p-2 text-center transition-all"
				:class="
					position === 'bottom'
						? 'top-4/3 center-vertical origin-top'
						: position === 'top'
						? 'bottom-4/3 center-vertical origin-bottom'
						: position === 'right'
						? ' left-4/3 center-horizontal top-0 origin-left'
						: position === 'left'
						? ' right-4/3 center-horizontal top-0 origin-right'
						: ''
				">
				{{ text }}
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
defineProps({
	text: String,
	position: { String, default: 'bottom' },
});
</script>
<style scoped>
.toolTip {
	visibility: hidden;
	transform: scale(0);
}
.itemForToolTip:hover .toolTip {
	visibility: visible;
	transform: none;
}

.center-vertical {
	left: calc(50% - 5rem);
}
.center-horizontal {
	top: calc(50% - 1.25rem);
}
</style>
