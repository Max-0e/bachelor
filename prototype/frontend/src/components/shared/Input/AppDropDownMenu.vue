<template>
	<div class="relative" @focusout="expanded = false" tabindex="0">
		<div class="p-1 w-full bg-gray-400 dark:bg-dark-50 rounded-lg cursor-pointer" @click="expanded = !expanded">
			<div class="flex pl-4 items-center justify-between">
				<span class="pr-5">
					{{ selectedOption.name }}
				</span>
				<AppIcon :class="expanded ? 'transform rotate-180' : ''"> expand_more </AppIcon>
			</div>
		</div>
		<div
			class="transition-all w-full absolute bg-gray-300 z-50 dark:bg-dark-400 rounded-md transform origin-top"
			:class="expanded ? 'transform-none' : 'scale-y-0'">
			<div
				v-for="option in options"
				class="cursor-pointer w-full px-3 py-1 hover:bg-gray-400 dark:hover:bg-dark-100"
				@click="selectOption(option)">
				{{ option.name }}
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { onMounted, PropType, ref } from 'vue';
import AppIcon from '../UI/AppIcon.vue';

const props = defineProps({
	selectText: { type: String, required: true },
	defaultValueName: String,
	options: { type: Object as PropType<{ name: string; value: any; disabled?: boolean; disabledTooltip?: string }[]> },
});

const expanded = ref(false);

const selectedOption = ref({ name: props.selectText, value: null });

onMounted(() => {
	if (!!props.defaultValueName && !!props.options) {
		const defaultOption = props.options.find((option) => option.name === props.defaultValueName);
		if (!!defaultOption) selectedOption.value = defaultOption;
	}
});

const emit = defineEmits(['update:modelValue']);

function selectOption(option: { name: string; value: any }) {
	selectedOption.value = option;
	expanded.value = false;
	emit('update:modelValue', option.value);
}
</script>
<style scoped></style>
