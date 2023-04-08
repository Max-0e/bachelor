<template>
	<AppModal ref="modal" @closed="formGroup.clear()">
		<div class="flex flex-col gap-10">
			<div class="px-10 text-3xl font-bold">Create new Level</div>
			<AppInputField
				ref="name"
				placeholder="Name"
				label="Name"
				id="name"
				:validation-types="[validationType.required, validationType.name]">
			</AppInputField>
			<AppInlineTextArea
				class="w-full"
				v-model="description"
				name="description"
				id="description"
				placeholder="Description"
				label="Description" />
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

import { ref } from 'vue';
import { FormGroup } from '../shared/Input/formGroup';

const levelStore = useLevelStore();

const modal = modalRef();

const open = () => modal.value?.open();

const description = ref('');
const name = inputRef();
const formGroup = new FormGroup({ name });

const submit = () => {
	if (!formGroup.validate()) return;
	const organization = useOrganizationStore().currentEntity;
	if (!organization) return;
	levelStore.createEntity({
		name: formGroup.formObjects.name.value,
		hierarchyLevel: levelStore.getNextHierarchyLevel,
		description: description.value,
	});
	modal.value?.close();
};

defineExpose({ open });
</script>
