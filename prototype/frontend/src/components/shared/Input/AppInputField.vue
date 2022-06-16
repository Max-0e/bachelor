<template>
	<AppLabel :for="name">{{ label }}</AppLabel>
	<div class="mx-5 mt-2 mb-5 relative rounded-md shadow-md">
		<input
			@input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
			class="p-3 pl-7 pr-12 block w-full dark:bg-dark-50 sm:text-sm rounded-md focus-visible:(outline outline-2)"
			:class="!!validationText && showValidation ? 'outline outline-2 outline-red-500':''"
			:type="type"
			:name="name"
			:id="id"
			:autocomplete="autocomplete"
			:placeholder="placeholder" />
		<TransitionGroup>
			<div class="absolute text-red-500 text-sm ml-7 mt-1" v-if="!!validationText && !!showValidation">
				{{ validationText }}
			</div>
		</TransitionGroup>
	</div>
</template>

<script setup lang="ts">
import { emailRegex } from '@/config';
import { validationType } from '@/enums/validationType.enum';
import { PropType, computed, toRefs, ref } from 'vue';
import AppLabel from './AppLabel.vue'; 

const showValidation = ref(false);


const props = defineProps({
	label: String,
	type: String,
	name: String,
	id: String,
	placeholder: String,
	modelValue: {type: String, required: true},
	autocomplete: String,
	validationTypes: Array as PropType<validationType[]>,
	match: String,
});

const emit = defineEmits(['validated', 'update:modelValue']);

const refProps = toRefs(props);

const validationText = computed(() => { 
	const modelValue = refProps.modelValue.value;
	const validationTypes = refProps.validationTypes?.value;

	if (!!validationTypes) {
		let text = ''
		validationTypes.forEach(type => {
			switch (type) {
				case validationType.required:
					if(modelValue === '') text = "required field";
					break;
				case validationType.matches:
					if(modelValue !== refProps.match?.value) text = "field does not match"
					break;
				case validationType.email:
					if (!emailRegex.test(modelValue)) text = "not a valid email-adress"
					break;
				case validationType.name:
					break;
			}
		})
		return text;
	}
	return false;
});

function validate(): boolean{
	showValidation.value = true;
	return !validationText.value;
}
defineExpose({validate})
</script>
