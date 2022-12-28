<template>
	<div>
		<AppInputField
			v-model="createLevelPayload.name"
			ref="name"
			placeholder="name"
			label="name"
			id="name"
			:validation-types="[validationType.required, validationType.name]">
		</AppInputField>
	</div>
	<AppButton @click="submit()">Create Level</AppButton>
</template>
<script lang="ts" setup>
import { validationType } from '@/enums/validationType.enum';
import { inputRef } from '@/intefaces/form.interface';
import { useLevelStore } from '@/store/level.store';
import { ref } from 'vue';

import { FormGroup } from '../shared/Input/formGroup';

const levelStore = useLevelStore();

const createLevelPayload = ref({
	name: '',
	hirarchyLevel: levelStore.getNextHirachyLevel,
	entityGroupIds: [],
});

const name = inputRef();
const formGroup = new FormGroup([name]);

const submit = () => {
	if (!formGroup.validate()) return;
	levelStore.createEntity(createLevelPayload.value);
};
</script>
