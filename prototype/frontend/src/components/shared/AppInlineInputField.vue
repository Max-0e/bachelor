<template>
	<div class="relative">
		<input
			@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value); changeShowSaveAndCancel(true)"
			class="p-3 pr-12 w-full block transition-all outline-none dark:bg-dark-200 dark:hover:bg-dark-100 focus-visible:(outline-transparent border-b border-gray-600) hover:(bg-gray-100)"
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
import AppLabel from '../shared/AppLabel.vue';

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
const initialModelValue = ref(props.modelValue);

function changeShowSaveAndCancel(newValue: boolean) {
	show.value = newValue;
}
</script>
