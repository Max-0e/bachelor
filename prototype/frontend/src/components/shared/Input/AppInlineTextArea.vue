<template>
	<div
		class="relative grid w-full"
		@keydown.enter.shift.exact="
			changeShowSaveAndCancel(false);
			$emit('save');
			blurInput();
		">
		<span
			class="gridArea invisible grid w-full whitespace-pre-wrap break-all p-3 pr-12 text-left">
			{{ modelValue || 'filler' }}
		</span>
		<textarea
			@input="
				$emit('update:modelValue', ($event.target as HTMLInputElement).value);
				changeShowSaveAndCancel(true);
			"
			class="gridArea bg-dark-50 focus-visible:(outline-transparent border-gray-600) hover:(bg-opacity-40) block w-full resize-none overflow-hidden rounded-md border-b bg-opacity-0 p-3 pr-12 outline-none transition-all dark:hover:bg-opacity-40"
			:value="modelValue"
			:name="name"
			:id="id"
			:placeholder="placeholder"></textarea>
		<div
			v-if="show"
			class="absolute -bottom-6 right-0 flex items-center gap-2 pr-2"
			:class="withLabel ? '' : 'bottom-1/5'">
			<span
				@click="
					$emit('save');
					changeShowSaveAndCancel(false);
					initialModelValue = modelValue;
				"
				class="material-icons cursor-pointer"
				>done</span
			>
			<span
				@click="
					changeShowSaveAndCancel(false);
					$emit('update:modelValue', initialModelValue);
				"
				class="material-icons cursor-pointer"
				>clear</span
			>
		</div>
		<AppLabel
			class="absolute -left-5 -top-5 text-sm"
			v-if="show && withLabel"
			:for="name">
			{{ label }}
		</AppLabel>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
	label: String,
	name: String,
	id: String,
	placeholder: String,
	modelValue: String,
	withLabel: { Boolean, default: true },
});

defineEmits(['update:modelValue', 'save']);

const show = ref(false);
const focus = ref(false);
const initialModelValue = ref(props.modelValue);

function changeShowSaveAndCancel(newValue: boolean) {
	show.value = newValue;
	focus.value = false;
}

function blurInput() {
	document.getElementById(props.id!)?.blur();
}
</script>
<style scoped>
.gridArea {
	/* Place on top of each other */
	grid-area: 1 / 1 / 2 / 2;
}
</style>
