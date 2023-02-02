<template>
	<div>
		<AppLabel :for="name">{{ label }}</AppLabel>
		<div class="mx-5 mt-2 mb-5 relative rounded-md shadow-md">
			<input
				@input="inputValue = ($event.target as HTMLInputElement).value"
				@focusout="showValidation = true"
				class="p-3 pl-7 pr-12 block w-full dark:bg-dark-50 sm:text-sm rounded-md focus-visible:(outline outline-2)"
				:class="
					!!validationText && showValidation
						? 'outline outline-2 outline-red-500'
						: ''
				"
				:type="type"
				:name="name"
				:id="id"
				:autocomplete="autocomplete"
				:placeholder="placeholder" />
			<TransitionGroup>
				<div
					class="absolute text-red-500 text-sm ml-7 mt-1"
					v-if="!!validationText && !!showValidation">
					{{ validationText }}
				</div>
			</TransitionGroup>
		</div>
	</div>
</template>

<script setup lang="ts">
import { emailRegex, nameRegex } from '@/config';
import { validationType } from '@/enums/validationType.enum';
import { computed, PropType, ref, toRefs, TransitionGroup } from 'vue';

const showValidation = ref(false);

const props = defineProps({
	label: String,
	type: String,
	name: String,
	id: String,
	placeholder: String,
	autocomplete: String,
	validationTypes: Array as PropType<validationType[]>,
	match: String,
});

const inputValue = ref('');

defineEmits(['validated']);

const refProps = toRefs(props);

const validationText = computed(() => {
	const modelValue = inputValue.value;
	const validationTypes = refProps.validationTypes?.value;

	if (!!validationTypes) {
		let text = '';
		validationTypes.forEach((type) => {
			switch (type) {
				case validationType.required:
					if (modelValue === '') text = 'required field';
					break;
				case validationType.matches:
					if (modelValue !== refProps.match?.value)
						text = 'field does not match';
					break;
				case validationType.email:
					if (!emailRegex.test(modelValue)) text = 'not a valid email-adress';
					break;
				case validationType.name:
					if (!nameRegex.test(modelValue)) text = 'not a valid value';
					break;
			}
		});
		return text;
	}
	return false;
});

function patchValue(newValue: string) {
	inputValue.value = newValue;
}
function getInputValue() {
	return inputValue.value;
}

function validate(): boolean {
	showValidation.value = true;
	return !validationText.value;
}

function resetValidation() {
	showValidation.value = false;
}
defineExpose({ validate, patchValue, getInputValue, resetValidation });
</script>
