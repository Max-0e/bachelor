<template>
	<div class="flex items-center group">
		<AppIcon
			class="transform select-none transition-all scale-0 group-hover:(!scale-100)"
			@click="editValue(false)"
			button
			>remove</AppIcon
		>
		<div
			class="bg-gray-200 dark:bg-dark-700 rounded-lg py-3 px-4 cursor-pointer">
			{{ valueToShow }}
		</div>
		<AppIcon
			class="transform select-none transition-all scale-0 group-hover:(!scale-100)"
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
