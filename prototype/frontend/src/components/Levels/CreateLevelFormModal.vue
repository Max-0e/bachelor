<template>
	<AppModal ref="modal" @closed="formGroup.clear()">
		<div>
			<AppInputField
				ref="name"
				placeholder="name"
				label="name"
				id="name"
				:validation-types="[validationType.required, validationType.name]">
			</AppInputField>
		</div>
		<AppButton @click="submit()">Create Level</AppButton>
	</AppModal>
</template>
<script lang="ts" setup>
import { validationType } from '@/enums/validationType.enum';
import { inputRef } from '@/intefaces/form.interface';
import { modalRef } from '@/intefaces/modal.interface';
import { useLevelStore } from '@/store/level.store';

import { FormGroup } from '../shared/Input/formGroup';

const levelStore = useLevelStore();

const modal = modalRef();

const open = () => modal.value?.open();

const name = inputRef();
const formGroup = new FormGroup({ name });

const submit = () => {
	if (!formGroup.validate()) return;
	levelStore.createEntity({
		name: formGroup.formObjects.name.value,
		hirarchyLevel: levelStore.getNextHirachyLevel,
		entityGroupIds: [],
	});
	modal.value?.close();
};

defineExpose({ open });
</script>
