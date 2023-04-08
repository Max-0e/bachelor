<template>
	<AppToolTip :text="tooltip" :position="tooltipPosition">
		<button
			@click="$emit('click')"
			type="button"
			class="text-md hover:(shadow-gray-400 shadow-md) hover:dark:shadow-dark-700 rounded-md font-semibold text-white transition focus:outline-none"
			:disabled="disabled"
			:class="`
				${noPadding ? 'p-0' : 'px-8'} 
				${slim ? 'py-1' : 'py-3'}
				${
					disabled
						? '!dark:bg-gray-400 !hover:bg-gray-300 !hover:dark:bg-gray-300 cursor-not-allowed !bg-gray-400'
						: ''
				} 
				${
					color == 'red'
						? 'hover:(!bg-red-800) bg-red-400 dark:bg-red-600'
						: 'hover:(!bg-blue-800) bg-blue-400 dark:bg-blue-600'
				} 
				`">
			<slot v-if="!iconButton"></slot>
			<div v-else class="flex">
				<span class="material-icons"><slot></slot></span>
			</div>
		</button>
	</AppToolTip>
</template>
<script setup lang="ts">
import { PropType } from 'vue';

defineProps({
	color: { type: String as PropType<'blue' | 'red'>, default: 'blue' },
	iconButton: Boolean,
	slim: Boolean,
	noPadding: Boolean,
	disabled: Boolean,
	tooltip: String,
	tooltipPosition: String,
});
defineEmits(['click']);
</script>
<style scoped></style>
