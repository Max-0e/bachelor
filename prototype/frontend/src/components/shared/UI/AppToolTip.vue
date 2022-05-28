<template>
	<div>
		<div class="itemForToolTip relative">
			<div class="w-full my-auto">
				<slot></slot>
			</div>
			<div
				v-if="!!text"
				class="toolTip z-50 transition-all absolute mx-auto bg-gray-200 dark:bg-dark-800 p-2 rounded-md w-40 h-10 origin"
				:class="
					position === 'bottom'
						? 'top-4/3 origin-top center-vertical'
						: position === 'top'
						? 'bottom-4/3 origin-bottom center-vertical'
						: position === 'right'
						? ' top-0 left-4/3 origin-left center-horizontal'
						: position === 'left'
						? ' top-0 right-4/3 origin-right center-horizontal'
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
