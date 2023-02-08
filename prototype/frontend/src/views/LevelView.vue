<template>
	<div>
		{{ useLevelStore().currentEntity?.name }}
	</div>
	<GroupCard
		@click="
			$router.push(
				$router.currentRoute.value.fullPath.toString() + '/group/' + group.id
			)
		"
		v-for="group of groupStore.currentGroups"
		:group="group" />
	<div v-if="groupStore.currentGroups.length === 0" class="italic">
		no {{ useLevelStore().currentEntity?.name }}
	</div>
	<AppFloatingActionButton @click="createGroupFormModal?.open()">
		add
	</AppFloatingActionButton>
	<CreateGroupFormModal ref="createGroupFormModal" />
</template>
<script lang="ts" setup>
import { modalRef } from '@/intefaces/modal.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useLevelStore } from '@/store/level.store';

const createGroupFormModal = modalRef();
const groupStore = useGroupStore();
</script>
