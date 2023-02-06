<template>
	<div class="w-full h-full">
		<div
			class="w-15 absolute bg-gray-200 dark:bg-dark-400 h-full top-0 left-0 pt-16">
			<AppToolTip
				class="w-full flex justify-center p-2"
				text="Project Overview"
				position="right">
				<router-link :to="{ name: 'Projects' }" class="transition-all">
					<AppIcon> arrow_back </AppIcon>
				</router-link>
			</AppToolTip>
			<AppToolTip
				class="w-full flex justify-center p-2"
				text="Project Dashboard"
				position="right"
				v-if="currentProject">
				<router-link :to="{ name: 'ProjectDashboard' }" class="transition-all">
					<AppIcon> dashboard </AppIcon>
				</router-link>
			</AppToolTip>
			<AppToolTip
				class="w-full flex justify-center p-2"
				text="Task-Board"
				position="right"
				v-if="currentProject">
				<router-link :to="{ name: 'ProjectBoard' }" class="transition-all">
					<AppIcon> waterfall_chart </AppIcon>
				</router-link>
			</AppToolTip>
			<AppToolTip
				class="w-full flex justify-center p-2"
				text="Backlog"
				position="right"
				v-if="currentProject">
				<router-link :to="{ name: 'ProjectBacklog' }" class="transition-all">
					<AppIcon> list </AppIcon>
				</router-link>
			</AppToolTip>
			<AppToolTip
				class="w-full flex justify-center p-2"
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
		<div class="w-full h-full pl-15">
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
