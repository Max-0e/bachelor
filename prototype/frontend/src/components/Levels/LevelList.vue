<template>
	<div
		class="flex items-center justify-between p-10 bg-gray-200 dark:bg-dark-500 m-10 text-left rounded-md"
		v-for="level in levelStore.entities">
		<div class="w-1/3 text-3xl font-bold">{{ level.name }}</div>
		<div class="w-1/3 text-3xl">{{ level.hierarchyLevel }}</div>
		<div class="w-1/3 flex justify-end">
			<AppToolTip
				v-if="
					level.hierarchyLevel >
					(organizationStore.currentEntity?.useEpics ? 1 : 0)
				"
				text="Delete Level"
				position="top">
				<AppIcon
					button
					@click="
						levelToDelete = level;
						deleteLevelModal?.open();
					"
					>delete</AppIcon
				>
			</AppToolTip>
		</div>
	</div>
	<div v-if="levelStore.entities.length === 0">no levels</div>
	<AppYesNoModal ref="deleteLevelModal" @yes="deleteLevel()"
		>Do you really want to delete {{ levelToDelete?.name }}?
		<br />
		<br />
		This will delete all groups in this level and all links from and to these
		groups.
	</AppYesNoModal>
</template>
<script lang="ts" setup>
import { Level } from '@/interfaces/level.interface';
import { modalRef } from '@/interfaces/modal.interface';
import { useLevelStore } from '@/store/level.store';
import { useOrganizationStore } from '@/store/organization.store';
import { ref } from 'vue';

const deleteLevelModal = modalRef();

const levelStore = useLevelStore();
const organizationStore = useOrganizationStore();

const levelToDelete = ref<Level>();

function deleteLevel() {
	if (!levelToDelete.value) return;
	levelStore.deleteEntity(levelToDelete.value);
}
</script>
