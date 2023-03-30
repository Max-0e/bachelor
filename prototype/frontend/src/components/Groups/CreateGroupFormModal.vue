<template>
	<AppModal ref="modal" @closed="formGroup.clear()">
		<div class="flex flex-col gap-10">
			<div class="text-3xl font-bold px-10">Create new Group</div>
			<AppInputField
				ref="name"
				placeholder="Name"
				label="Name"
				id="name"
				:validation-types="[validationType.required, validationType.name]">
			</AppInputField>
			<AppButton @click="submit()"
				>Create {{ levelStore.currentEntity?.name }}</AppButton
			>
		</div>
	</AppModal>
</template>
<script lang="ts" setup>
import { validationType } from '@/enums/validationType.enum';
import { inputRef } from '@/interfaces/form.interface';
import { modalRef } from '@/interfaces/modal.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useLevelStore } from '@/store/level.store';

import { FormGroup } from '../shared/Input/formGroup';

const groupStore = useGroupStore();
const levelStore = useLevelStore();

const modal = modalRef();

const open = () => modal.value?.open();

const name = inputRef();
const formGroup = new FormGroup({ name });

const submit = () => {
	if (!formGroup.validate()) return;

	const currentLevel = levelStore.currentEntity;
	if (!currentLevel) return;

	groupStore.createEntity({
		name: formGroup.formObjects.name.value,
		levelId: currentLevel.id,
		entityGroupIds: [],
	});

	modal.value?.close();
};

defineExpose({ open });
</script>
