<template>
	<AppModal ref="modal" @closed="formGroup.clear()">
		<div class="flex flex-col gap-10">
			<div class="text-3xl">Create new Organization</div>
			<AppInputField
				ref="name"
				placeholder="name"
				label="name"
				id="name"
				:validation-types="[validationType.required, validationType.name]">
			</AppInputField>
			<AppToggleInput
				:initial-value="useEpics"
				label="use Epics"
				@change="useEpics = !useEpics"></AppToggleInput>
			<AppButton @click="submit()">Create Organization</AppButton>
		</div>
	</AppModal>
</template>
<script lang="ts" setup>
import { validationType } from '@/enums/validationType.enum';
import { inputRef } from '@/interfaces/form.interface';
import { modalRef } from '@/interfaces/modal.interface';
import { useOrganizationStore } from '@/store/organization.store';
import { ref } from '@vue/reactivity';

import { FormGroup } from '../shared/Input/formGroup';

const organizationStore = useOrganizationStore();

const modal = modalRef();

const open = () => modal.value?.open();

const name = inputRef();
const formGroup = new FormGroup({ name });
const useEpics = ref(true);

const submit = () => {
	if (!formGroup.validate()) return;
	organizationStore.createEntity({
		name: formGroup.formObjects.name.value,
		useEpics: useEpics.value,
	});
	modal.value?.close();
};

defineExpose({ open });
</script>
