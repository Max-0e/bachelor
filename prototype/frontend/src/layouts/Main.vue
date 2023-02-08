<template>
	<nav
		class="w-full relative h-15 top-0 shadow-md flex justify-between z-99 bg-white dark:(bg-dark-700)">
		<div class="flex flex-wrap">
			<h1
				class="text-3xl my-auto ml-5 content-center cursor-pointer"
				@click="router.push({ name: 'Organization' })">
				{{ organizationStore.currentEntity?.name ?? 'Prototype' }}
			</h1>
			<div
				v-if="!!organizationStore.currentEntity"
				class="ml-5 flex items-center">
				<router-link
					:to="{ name: 'Dashboard' }"
					class="transition-all rounded-md px-2"
					>Dashboard</router-link
				>
				<span class="cursor-default px-1">|</span>
				<router-link
					:to="{ name: 'Levels' }"
					class="transition-all rounded-md px-2"
					>Levels</router-link
				>
				<div
					v-for="level of levelStore.entities.sort(
						(a, b) => b.hirarchyLevel - a.hirarchyLevel
					)">
					<router-link
						v-if="
							level.hirarchyLevel > 1 ||
							(level.hirarchyLevel === 1 &&
								!organizationStore.currentEntity?.useEpics)
						"
						:to="{ name: 'LevelView', params: { levelId: level.id } }"
						class="transition-all rounded-md px-2 m-2"
						>{{ level.name }}</router-link
					>
					<router-link
						v-else-if="
							level.hirarchyLevel > 0 ||
							!organizationStore.currentEntity?.useEpics
						"
						class="transition-all rounded-md px-2 m-2"
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
			<div class="flex justify-center items-center">
				<AppIcon @click="refreshData()" :class="{ 'animate-spin': refreshing }">
					autorenew
				</AppIcon>
			</div>
			<div class="flex relative items-center p-2 hoverForContextMenu">
				<AppChip>person</AppChip>
				<div
					class="contextMenu transition-all absolute top-15 right-3 w-25 z-50">
					<div
						class="cursor-pointer w-full px-3 py-1 rounded-t-lg bg-gray-300 hover:bg-gray-400 dark:bg-dark-400 dark:hover:bg-dark-100"
						@click="router.push({ name: 'Profile' })">
						Profile
					</div>
					<div
						class="cursor-pointer w-full px-3 py-1 bg-gray-300 hover:bg-gray-400 dark:bg-dark-400 dark:hover:bg-dark-100"
						@click="router.push({ name: 'Settings' })">
						Settings
					</div>
					<div
						class="cursor-pointer text-white w-full px-3 py-1 rounded-b-lg bg-red-500 hover:bg-red-400 dark:bg-red-900 dark:hover:bg-red-700"
						@click="logout()">
						Logout
					</div>
				</div>
			</div>
		</div>
	</nav>
	<div class="w-full p-5 content-container overflow-scroll overflow-x-hidden">
		<!-- <Transition> -->
		<router-view />
		<!-- </Transition> -->
	</div>
	<footer
		class="w-full relative h-8 p-1 flex justify-between shadow-md bg-gray-100 dark:(bg-dark-100)">
		<div class="flex justify-evenly">
			<span>Welcome {{ authStore.user?.username }}</span>
		</div>
	</footer>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/store/auth';
import { useGroupStore } from '@/store/entity-groups.store';
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
const router = useRouter();
const authStore = useAuthStore();
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
