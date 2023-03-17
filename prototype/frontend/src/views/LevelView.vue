<template>
	<div class="text-3xl my-5">
		{{ useLevelStore().currentEntity?.name }}
	</div>
	<div class="flex flex-wrap gap-5">
		<GroupCard
			class="flex-grow"
			@click="
				$router.push({ name: 'GroupView', params: { groupId: group.id } })
			"
			v-for="group of groupStore.currentGroups"
			:group="group" />
	</div>
	<div v-if="groupStore.currentGroups.length === 0" class="italic">
		no {{ useLevelStore().currentEntity?.name }}
	</div>
	<AppFloatingActionButton @click="createGroupFormModal?.open()">
		add
	</AppFloatingActionButton>
	<CreateGroupFormModal ref="createGroupFormModal" />
</template>
<script lang="ts" setup>
import { modalRef } from '@/interfaces/modal.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useLevelStore } from '@/store/level.store';

const createGroupFormModal = modalRef();
const groupStore = useGroupStore();
</script>
