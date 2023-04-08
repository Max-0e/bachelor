<template>
	<div class="group flex items-center">
		<AppIcon
			class="group-hover:(!scale-100) scale-0 transform select-none transition-all"
			@click="editValue(false)"
			button
			>remove</AppIcon
		>
		<div
			class="dark:bg-dark-700 cursor-pointer rounded-lg bg-gray-200 px-4 py-3">
			{{ valueToShow }}
		</div>
		<AppIcon
			class="group-hover:(!scale-100) scale-0 transform select-none transition-all"
			button
			@click="editValue(true)"
			>add</AppIcon
		>
	</div>
</template>
<script setup lang="ts">
import { ref, toRef, watch } from 'vue';

const props = defineProps({
	value: { type: Number, required: true },
	minNumber: { type: Number },
	maxNumber: { type: Number },
	debounce: { type: Boolean },
	debounceTime: { type: Number, default: 500 },
});

const debounceTimeOut = ref<NodeJS.Timeout | null>(null);
const _value = toRef(props, 'value');
const valueToShow = ref(_value.value);
watch(_value, (value) => {
	valueToShow.value = value;
});

const editValue = (add: boolean) => {
	if (valueToShow.value === props.minNumber && !add) return;
	if (valueToShow.value === props.maxNumber && add) return;
	add ? (valueToShow.value += 1) : (valueToShow.value -= 1);
	if (!props.debounce) {
		emits('change', valueToShow.value);
		return;
	}
	if (!!debounceTimeOut.value) clearTimeout(debounceTimeOut.value);
	debounceTimeOut.value = setTimeout(
		() => emits('change', valueToShow.value),
		props.debounceTime
	);
};

const emits = defineEmits<{ (event: 'change', number: number): number }>();
</script>
