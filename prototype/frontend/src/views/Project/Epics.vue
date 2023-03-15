<template>
	<div v-if="!!groupStore.currentEntity" class="w-full flex gap-5 flex-wrap">
		<EpicCard
			@click="openDetailsModal(epic)"
			@deleteEpic="openDeleteModal(epic)"
			:project="groupStore.currentEntity"
			:epic="epic"
			:key="epic.name"
			v-for="epic in groupStore.downwardsLinkedGroupsForCurrentGroup" />

		<AppFloatingActionButton @click="createEpicModal!.open()" icon
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
		<AppModal ref="detailsModal" large>
			<EpicDetails
				v-if="epicForDetails"
				:project="groupStore.currentEntity"
				:epic="epicForDetails"
				@deleteEpic="
					detailsModal?.close();
					openDeleteModal($event);
				" />
		</AppModal>
		<AppYesNoModal
			ref="deleteModal"
			@yes="
				groupStore.deleteEntity(epicToDelete!);
				deleteModal!.close();
			">
			Delete Epic "{{ epicToDelete?.name }}"?
		</AppYesNoModal>
	</div>
	<div v-else>Something went Wrong...</div>
</template>
<script setup lang="ts">
import { FormGroup } from '@/components/shared/Input/formGroup';
import { validationType } from '@/enums/validationType.enum';
import { EntityGroup } from '@/interfaces/entity-groups.interface';
import { inputRef } from '@/interfaces/form.interface';
import { modalRef } from '@/interfaces/modal.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useLevelStore } from '@/store/level.store';
import { ref } from 'vue';

const groupStore = useGroupStore();
const levelStore = useLevelStore();

const name = inputRef();
const createEpicModal = modalRef();
const deleteModal = modalRef();
const detailsModal = modalRef();
const formGroup = new FormGroup({ name });

const epicToDelete = ref<EntityGroup | undefined>();
const epicForDetails = ref<EntityGroup | undefined>();

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

const openDetailsModal = (epic: EntityGroup) => {
	epicForDetails.value = epic;
	detailsModal.value?.open();
};
const openDeleteModal = (epic: EntityGroup) => {
	epicToDelete.value = epic;
	deleteModal.value?.open();
};
</script>
