<template>
	<nav
		class="h-15 z-99 dark:(bg-dark-700) relative top-0 flex w-full justify-between bg-white shadow-md">
		<div class="flex flex-wrap">
			<h1
				class="my-auto ml-5 cursor-pointer content-center text-3xl"
				@click="router.push({ name: 'Organization' })">
				{{ organizationStore.currentEntity?.name ?? 'Prototype' }}
			</h1>
			<div
				v-if="!!organizationStore.currentEntity"
				class="ml-5 flex items-stretch">
				<router-link
					:to="{ name: 'Dashboard' }"
					class="rounded-md px-2 m-2 transition-all flex items-center"
					>Dashboard</router-link
				>
				<span class="cursor-default text-4xl font-bold px-2 my-auto pb-1"
					>|</span
				>
				<router-link
					:to="{ name: 'Levels' }"
					class="rounded-md px-2 m-2 transition-all flex items-center"
					>Levels</router-link
				>
				<div
					class="flex items-stretch"
					v-for="level of levelStore.currentEntitiesFromOrganization.sort(
						(a, b) => b.hierarchyLevel - a.hierarchyLevel
					)">
					<router-link
						v-if="
							level.hierarchyLevel > 1 ||
							(level.hierarchyLevel === 1 &&
								!organizationStore.currentEntity?.useEpics)
						"
						:to="{ name: 'LevelView', params: { levelId: level.id } }"
						class="m-2 rounded-md px-2 transition-all flex items-center"
						>{{ level.name }}</router-link
					>
					<router-link
						v-else-if="
							level.hierarchyLevel > 0 ||
							!organizationStore.currentEntity?.useEpics
						"
						class="m-2 rounded-md px-2 transition-all flex items-center"
						:to="{
							name: 'Projects',
							params: { levelId: level.id },
						}">
						{{ level.name }}</router-link
					>
				</div>
			</div>
		</div>
		<div class="flex">
			<div class="flex items-center justify-center gap-2">
				<AppIcon>
					{{
						appStore.progressType === 'storyPoints'
							? 'token'
							: appStore.progressType === 'value'
							? 'diamond'
							: 'incomplete_circle'
					}}
				</AppIcon>
				<AppDropDownMenu
					class="min-w-48"
					selectText="select progress type"
					:bgColor="
						appStore.progressType === 'storyPoints'
							? 'bg-blue-800 text-white'
							: appStore.progressType === 'value'
							? 'bg-successGreen text-white'
							: undefined
					"
					@update:model-value="appStore.setProgressType($event)"
					:defaultValueName="appStore.progressType"
					:options="[
						{ name: 'absolute', value: 'absolute' },
						{ name: 'storyPoints', value: 'storyPoints' },
						{ name: 'value', value: 'value' },
					]">
				</AppDropDownMenu>
				<AppIcon @click="refreshData()" :class="{ 'animate-spin': refreshing }">
					autorenew
				</AppIcon>
			</div>
			<div class="hoverForContextMenu relative flex items-center p-2">
				<AppChip>person</AppChip>
				<div
					class="contextMenu top-15 w-25 absolute right-3 z-50 transition-all">
					<div
						class="dark:bg-dark-400 dark:hover:bg-dark-100 w-full cursor-pointer rounded-t-lg bg-gray-300 px-3 py-1 hover:bg-gray-400"
						@click="router.push({ name: 'Profile' })">
						Profile
					</div>
					<div
						class="dark:bg-dark-400 dark:hover:bg-dark-100 w-full cursor-pointer bg-gray-300 px-3 py-1 hover:bg-gray-400"
						@click="router.push({ name: 'Settings' })">
						Settings
					</div>
					<div
						class="w-full cursor-pointer rounded-b-lg bg-red-500 px-3 py-1 text-white hover:bg-red-400 dark:bg-red-900 dark:hover:bg-red-700"
						@click="logout()">
						Logout
					</div>
				</div>
			</div>
		</div>
	</nav>
	<div class="content-container w-full overflow-scroll overflow-x-hidden p-5">
		<!-- <Transition> -->
		<router-view />
		<!-- </Transition> -->
	</div>
	<footer
		class="dark:(bg-dark-100) relative flex h-8 w-full justify-between bg-gray-100 p-1 shadow-md">
		<div class="flex justify-evenly">
			<span>Welcome {{ authStore.user?.username }}</span>
		</div>
		<span v-if="authStore.user?.jiraApiToken" class="flex items-center">
			Jira connected with {{ authStore.user?.jiraApiDomain }}.attlasian.net
			<AppIcon class="text-successGreen">check</AppIcon>
		</span>
		<span v-else class="flex items-center gap-5">
			<div class="flex items-center">
				Jira not connected
				<AppIcon class="text-red-500">close</AppIcon>
			</div>
			<div
				class="flex items-center cursor-pointer"
				@click="$router.push({ name: 'Profile' })">
				connect now
				<AppIcon class="text-blue-500">link</AppIcon>
			</div>
		</span>
	</footer>
</template>

<script setup lang="ts">
import { useAppStore } from '@/store/app';
import { useAuthStore } from '@/store/auth';
import { useGroupStore } from '@/store/entity-groups.store';
import { useJiraStore } from '@/store/jira.store';
import { useLevelStore } from '@/store/level.store';
import { useOrganizationStore } from '@/store/organization.store';
import { useTaskStore } from '@/store/tasks.store';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const refreshing = ref(false);
const organizationStore = useOrganizationStore();
const groupStore = useGroupStore();
const taskStore = useTaskStore();
const levelStore = useLevelStore();
const jiraStore = useJiraStore();
const router = useRouter();
const authStore = useAuthStore();
const appStore = useAppStore();
const toast = useToast();

async function logout() {
	authStore.logout().then((_) => {
		router.push({ name: 'Login' });
	});
}

async function refreshData() {
	refreshing.value = true;
	await taskStore.loadEntities();
	await groupStore.loadEntities();
	await levelStore.loadEntities();
	await jiraStore.loadProjects();
	toast.info('you are up to date', { timeout: 1500 });
	refreshing.value = false;
}
</script>
<style scoped>
.contextMenu {
	visibility: hidden;
	transform-origin: 90% 0%;
	transform: scale(0);
}
.hoverForContextMenu:hover .contextMenu {
	visibility: visible;
	transform: none;
}

.content-container {
	height: calc(100vh - 5.75rem);
}
</style>
