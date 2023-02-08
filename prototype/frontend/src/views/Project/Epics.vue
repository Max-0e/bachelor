<template>
	<div v-if="!!groupStore.currentEntity" class="w-full flex gap-5">
		<EpicCard
			:epic="epic"
			:key="epic.name"
			v-for="epic in groupStore.downwardsLinkedGroupsForCurrentGroup" />

		<AppFloatingActionButton @click="createEpicModal!.open()" :icon="true"
			>add</AppFloatingActionButton
		>
		<AppModal ref="createEpicModal" @closed="formGroup.clear()">
			<div class="flex flex-col">
				<AppInputField
					ref="name"
					placeholder="name"
					label="name"
					id="name"
					:validation-types="[validationType.required, validationType.name]">
				</AppInputField>
				<AppButton @click="submit()">Create Epic</AppButton>
			</div>
		</AppModal>
	</div>
	<div v-else>Something went Wrong...</div>
</template>
<script setup lang="ts">
import { FormGroup } from '@/components/shared/Input/formGroup';
import { validationType } from '@/enums/validationType.enum';
import { inputRef } from '@/intefaces/form.interface';
import { modalRef } from '@/intefaces/modal.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useLevelStore } from '@/store/level.store';

const groupStore = useGroupStore();
const levelStore = useLevelStore();

const name = inputRef();
const createEpicModal = modalRef();
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
	});

	createEpicModal.value?.close();
};
</script>
