<template>
	<div class="relative" @keydown.enter="
		changeShowSaveAndCancel(false);
		$emit('save');
		blurInput()
	">
		<input
			@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value); changeShowSaveAndCancel(true)"
			class="p-3 pr-12 bg-dark-50 bg-opacity-0 w-full block transition-all outline-none dark:hover:bg-opacity-40 focus-visible:(outline-transparent border-b border-gray-600) hover:(bg-opacity-40)"
			:value="modelValue"
			:type="type"
			:name="name"
			:id="id"
			:placeholder="placeholder" />
		<div v-if="show" class="pr-2 absolute right-0 flex gap-2 items-center" :class="withLabel ? '' : 'bottom-1/5'">
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
		<AppLabel class="absolute text-sm" v-if="show && withLabel" :for="name">{{ label }}</AppLabel>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import AppLabel from './AppLabel.vue';

const props = defineProps({
	label: String,
	type: String,
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
