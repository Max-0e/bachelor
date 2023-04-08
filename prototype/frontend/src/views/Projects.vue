<template>
	<div class="my-5 text-3xl">
		{{ levelStore.currentEntity?.name }} (operative)
	</div>
	<div v-if="groupStore.currentGroups.length === 0" class="italic">
		no {{ levelStore.currentEntity?.name }}
	</div>
	<div class="flex flex-wrap gap-5">
		<TransitionGroup>
			<ProjectCard
				class="flex-grow cursor-pointer"
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
	<AppFloatingActionButtonWithContextMenu>
		<AppToolTip text="Create new project" position="left">
			<AppIcon button with-background @click="createGroupFormModal?.open()"
				>add</AppIcon
			>
		</AppToolTip>
		<AppToolTip text="Import from file" position="left">
			<AppIcon
				class="text-successGreen"
				button
				with-background
				@click="importProjectFromFileModal?.open()"
				>upload</AppIcon
			>
		</AppToolTip>
		<AppToolTip
			v-if="authStore.user?.jiraApiToken"
			text="Import from Jira"
			position="left">
			<AppIcon
				class="text-blue-700"
				button
				with-background
				@click="importProjectFromJiraModal?.open()"
				>backup</AppIcon
			>
		</AppToolTip>
	</AppFloatingActionButtonWithContextMenu>
	<CreateGroupFormModal ref="createGroupFormModal" />
	<ImportProjectFromFile ref="importProjectFromFileModal" />
	<ImportProjectFromJira ref="importProjectFromJiraModal" />
</template>

<script setup lang="ts">
import { modalRef } from '@/interfaces/modal.interface';
import { useAuthStore } from '@/store/auth';
import { useGroupStore } from '@/store/entity-groups.store';
import { useLevelStore } from '@/store/level.store';

const groupStore = useGroupStore();
const levelStore = useLevelStore();
const authStore = useAuthStore();

const createGroupFormModal = modalRef();
const importProjectFromFileModal = modalRef();
const importProjectFromJiraModal = modalRef();
</script>
