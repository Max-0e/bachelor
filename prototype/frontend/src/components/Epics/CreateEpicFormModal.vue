<template>
	<AppModal ref="modal" @closed="formGroup.clear()">
		<div class="flex flex-col gap-10">
			<div class="px-10 text-3xl font-bold">Create new Epic</div>
			<AppInputField
				ref="name"
				placeholder="Name"
				label="Name"
				id="name"
				:validation-types="[validationType.required, validationType.name]">
			</AppInputField>
			<AppInlineInputField
				v-model="description"
				name="description"
				id="description"
				placeholder="Description"
				label="Description" />
			<AppButton @click="submit()">Create Epic</AppButton>
		</div>
	</AppModal>
</template>
<script lang="ts" setup>
import { validationType } from '@/enums/validationType.enum';
import { inputRef } from '@/interfaces/form.interface';
import { modalRef } from '@/interfaces/modal.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useLevelStore } from '@/store/level.store';

import { ref } from 'vue';
import { FormGroup } from '../shared/Input/formGroup';

const groupStore = useGroupStore();
const levelStore = useLevelStore();

const modal = modalRef();

const open = () => modal.value?.open();

const description = ref('');
const name = inputRef();
const formGroup = new FormGroup({ name });

const submit = () => {
	if (!formGroup.validate()) return;

	const lowerLevel = levelStore.getLowerLevel;
	const currentGroup = groupStore.currentEntity;
	if (!lowerLevel || !currentGroup) return;

	groupStore.createEntity({
		name: formGroup.formObjects.name.value,
		levelId: lowerLevel.id,
		entityGroupIds: [currentGroup.id],
		description: description.value,
	});

	modal.value?.close();
};

defineExpose({ open });
</script>
