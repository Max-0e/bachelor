<template>
	<div>{{ useLevelStore().currentEntity?.name }} (operative)</div>
	<div v-if="groupStore.currentGroups.length === 0" class="italic">
		no {{ useLevelStore().currentEntity?.name }}
	</div>
	<div class="flex flex-wrap gap-5">
		<TransitionGroup>
			<ProjectCard
				class="cursor-pointer flex-grow"
				:key="project.name"
				v-for="project in groupStore.currentGroups"
				:project="project"
				@click="
					$router.push({
						name: 'ProjectDashboard',
						params: { groupId: project.id },
					})
				" />
		</TransitionGroup>
	</div>
	<AppFloatingActionButton @click="createGroupFormModal?.open()">
		add
	</AppFloatingActionButton>
	<CreateGroupFormModal ref="createGroupFormModal" />
</template>

<script setup lang="ts">
import { modalRef } from '@/intefaces/modal.interface';
import { useGroupStore } from '@/store/entity-groups.store';
import { useLevelStore } from '@/store/level.store';

const createGroupFormModal = modalRef();
const groupStore = useGroupStore();
</script>
