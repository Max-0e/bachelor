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
		<CreateEpicFormModal ref="createEpicModal"></CreateEpicFormModal>
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
import { EntityGroup } from '@/interfaces/entity-groups.interface';
import { modalRef } from '@/interfaces/modal.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { ref } from 'vue';

const groupStore = useGroupStore();

const createEpicModal = modalRef();
const deleteModal = modalRef();
const detailsModal = modalRef();

const epicToDelete = ref<EntityGroup | undefined>();
const epicForDetails = ref<EntityGroup | undefined>();

const openDetailsModal = (epic: EntityGroup) => {
	epicForDetails.value = epic;
	detailsModal.value?.open();
};
const openDeleteModal = (epic: EntityGroup) => {
	epicToDelete.value = epic;
	deleteModal.value?.open();
};
</script>
