<template>
	<div v-if="!!groupStore.currentEntity">
		<div
			v-if="groupStore.downwardsLinkedGroupsForCurrentGroup.length > 0"
			class="flex w-full flex-wrap gap-5">
			<EpicCard
				@click="openDetailsModal(epic)"
				@deleteEpic="openDeleteModal(epic)"
				:project="groupStore.currentEntity"
				:epic="epic"
				:key="epic.name"
				v-for="epic in groupStore.downwardsLinkedGroupsForCurrentGroup" />

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
		<div v-else>
			Looks like you don't have any Epics yet, create your first one in the
			bottom right corner.
		</div>
		<AppFloatingActionButton @click="createEpicModal!.open()" icon
			>add</AppFloatingActionButton
		>
		<CreateEpicFormModal ref="createEpicModal"></CreateEpicFormModal>
	</div>
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
