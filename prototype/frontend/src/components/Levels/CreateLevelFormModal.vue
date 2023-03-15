<template>
	<AppModal ref="modal" @closed="formGroup.clear()">
		<div class="flex flex-col gap-10">
			<div class="text-3xl">Create new Level</div>
			<AppInputField
				ref="name"
				placeholder="name"
				label="name"
				id="name"
				:validation-types="[validationType.required, validationType.name]">
			</AppInputField>
			<AppButton @click="submit()">Create Level</AppButton>
		</div>
	</AppModal>
</template>
<script lang="ts" setup>
import { validationType } from '@/enums/validationType.enum';
import { inputRef } from '@/interfaces/form.interface';
import { modalRef } from '@/interfaces/modal.interface';
import { useLevelStore } from '@/store/level.store';
import { useOrganizationStore } from '@/store/organization.store';

import { FormGroup } from '../shared/Input/formGroup';

const levelStore = useLevelStore();

const modal = modalRef();

const open = () => modal.value?.open();

const name = inputRef();
const formGroup = new FormGroup({ name });

const submit = () => {
	if (!formGroup.validate()) return;
	const organization = useOrganizationStore().currentEntity;
	if (!organization) return;
	levelStore.createEntity({
		name: formGroup.formObjects.name.value,
		hierarchyLevel: levelStore.getNextHirachyLevel,
	});
	modal.value?.close();
};

defineExpose({ open });
</script>
