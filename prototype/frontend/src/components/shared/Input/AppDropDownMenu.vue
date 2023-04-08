<template>
	<div class="relative" @focusout="expanded = false" tabindex="0">
		<div
			class="w-full cursor-pointer rounded-lg p-1 shadow-lg"
			:class="bgColor"
			@click="expanded = !expanded">
			<div class="flex items-center justify-between pl-4">
				<span class="pr-5">
					{{ selectedOption.name }}
				</span>
				<AppIcon :class="expanded ? 'rotate-180 transform' : ''">
					expand_more
				</AppIcon>
			</div>
		</div>
		<div
			class="dark:bg-dark-400 absolute z-50 w-full origin-top transform overflow-hidden rounded-md bg-gray-300 shadow-lg transition-all"
			:class="expanded ? 'transform-none' : 'scale-y-0'">
			<div
				v-for="option in options"
				class="dark:hover:bg-dark-200 w-full cursor-pointer px-3 py-1 hover:bg-gray-400"
				:class="option.disabled ? 'dark:bg-dark-200 bg-gray-200' : ''"
				@click="selectOption(option)">
				<AppToolTip :text="option.disabled ? option.disabledTooltip : ''">
					{{ option.name }}
				</AppToolTip>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, PropType, ref, toRef, watch } from 'vue';

const props = defineProps({
	selectText: { type: String, required: true },
	defaultValueName: String,
	bgColor: { type: String, default: 'bg-gray-200 dark:bg-dark-50' },
	options: {
		type: Object as PropType<
			{
				name: string;
				value: any;
				disabled?: boolean;
				disabledTooltip?: string;
			}[]
		>,
	},
});

const defaultValueName = toRef(props, 'defaultValueName');
watch(defaultValueName, (x) => {
	setDefaultOption(x);
});

const expanded = ref(false);

const selectedOption = ref({ name: props.selectText, value: null });

onMounted(() => {
	setDefaultOption(props.defaultValueName);
});

const setDefaultOption = (value?: string) => {
	if (!!value && !!props.options) {
		const defaultOption = props.options.find(
			(option) => option.name === props.defaultValueName
		);
		if (!!defaultOption) selectedOption.value = defaultOption;
	}
};

const emit = defineEmits(['update:modelValue']);

function selectOption(option: {
	name: string;
	value: any;
	disabled?: boolean;
	disabledTooltip?: string;
}) {
	if (option.disabled) return;
	selectedOption.value = option;
	expanded.value = false;
	emit('update:modelValue', option.value);
}
const reset = () =>
	(selectedOption.value = { name: props.selectText, value: null });

defineExpose({ reset, selectOption });
</script>
<style scoped></style>
