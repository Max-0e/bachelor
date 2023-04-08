<template>
	<div
		class="relative"
		@keydown.enter="
			changeShowSaveAndCancel(false);
			$emit('save');
			blurInput();
		">
		<input
			@input="
				$emit('update:modelValue', ($event.target as HTMLInputElement).value);
				changeShowSaveAndCancel(true);
			"
			class="bg-dark-50 focus-visible:(outline-transparent border-gray-600) hover:(bg-opacity-40) block w-full rounded-md border-b bg-opacity-0 p-3 pr-12 outline-none transition-all dark:hover:bg-opacity-40"
			:value="modelValue"
			:type="type"
			:name="name"
			:id="id"
			:placeholder="placeholder" />
		<div
			v-if="show"
			class="absolute right-0 flex items-center gap-2 pr-2"
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
		<AppLabel class="absolute text-sm" v-if="show && withLabel" :for="name">{{
			label
		}}</AppLabel>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

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
