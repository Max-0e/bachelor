<template>
	<div class="h-full w-full">
		<div
			class="w-15 dark:bg-dark-400 absolute left-0 top-0 h-full bg-gray-200 pt-16">
			<AppToolTip
				class="flex w-full justify-center p-2"
				text="Project Overview"
				position="right">
				<router-link :to="{ name: 'Projects' }" class="transition-all">
					<AppIcon> arrow_back </AppIcon>
				</router-link>
			</AppToolTip>
			<AppToolTip
				class="flex w-full justify-center p-2"
				text="Project Dashboard"
				position="right"
				v-if="currentProject">
				<router-link :to="{ name: 'ProjectDashboard' }" class="transition-all">
					<AppIcon> dashboard </AppIcon>
				</router-link>
			</AppToolTip>
			<AppToolTip
				class="flex w-full justify-center p-2"
				text="Task-Board"
				position="right"
				v-if="currentProject">
				<router-link :to="{ name: 'ProjectBoard' }" class="transition-all">
					<AppIcon> waterfall_chart </AppIcon>
				</router-link>
			</AppToolTip>
			<AppToolTip
				class="flex w-full justify-center p-2"
				text="Backlog"
				position="right"
				v-if="currentProject">
				<router-link :to="{ name: 'ProjectBacklog' }" class="transition-all">
					<AppIcon> list </AppIcon>
				</router-link>
			</AppToolTip>
			<AppToolTip
				class="flex w-full justify-center p-2"
				text="Epics"
				position="right"
				v-if="currentProject && useOrganizationStore().currentEntity?.useEpics">
				<router-link :to="{ name: 'Epics' }" class="transition-all">
					<AppIcon> view_module </AppIcon>
				</router-link>
			</AppToolTip>
			<!-- <AppToolTip
				class="w-full flex justify-center p-2"
				text="Project Settings"
				position="right"
				v-if="currentProject">
				<router-link :to="{ name: 'ProjectSettings' }" class="transition-all">
					<AppIcon> settings </AppIcon>
				</router-link>
			</AppToolTip> -->
		</div>
		<div class="pl-15 h-full w-full">
			<router-view />
		</div>
	</div>
</template>
<script setup lang="ts">
import { useGroupStore } from '@/store/entity-groups.store';
import { useOrganizationStore } from '@/store/organization.store';
import { ref } from '@vue/reactivity';

const groupStore = useGroupStore();

const currentProject = ref(groupStore.currentEntity);
</script>
