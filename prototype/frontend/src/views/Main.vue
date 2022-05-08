<template>
	<nav class="w-full relative h-15 top-0 shadow-md flex justify-between dark:(bg-dark-700)">
		<div class="flex flex-wrap">
			<h1 class="text-3xl my-auto ml-5 content-center"><router-link to="/dashboard">Prototype</router-link></h1>
			<div class="p-5 flex gap-5 items-center">
				<router-link to="/dashboard">Dashboard</router-link>
				<span class="cursor-default">|</span>
				<router-link to="/initiatives">Initiatives</router-link>
				<router-link to="/projects">Projects</router-link>
			</div>
		</div>
		<div class="flex relative items-center p-2 hoverForContextMenu">
			<AppChip>person</AppChip>
			<div class="contextMenu transition-all absolute top-15 right-1 w-25 z-50">
				<div
					class="cursor-pointer w-full px-3 py-1 rounded-t-lg bg-gray-300 hover:bg-gray-400 dark:bg-dark-400 dark:hover:bg-dark-100"
					@click="router.push('/profile')">
					Profile
				</div>
				<div
					class="cursor-pointer w-full px-3 py-1 bg-gray-300 hover:bg-gray-400 dark:bg-dark-400 dark:hover:bg-dark-100"
					@click="router.push('/settings')">
					Settings
				</div>
				<div
					class="cursor-pointer text-white w-full px-3 py-1 rounded-b-lg bg-red-500 hover:bg-red-400 dark:bg-red-900 dark:hover:bg-red-700"
					@click="logout()">
					Logout
				</div>
			</div>
		</div>
	</nav>
	<div class="w-full p-5 content-container overflow-scroll overflow-x-hidden">
		<router-view />
	</div>
	<footer class="w-full relative h-8 p-1 flex justify-between shadow-md bg-gray-100 dark:(bg-dark-100)">
		<div class="flex justify-evenly">
			<span>hello {{ useAuthStore().user?.username }}</span>
		</div>
	</footer>
</template>

<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/store/auth';
import AppButton from '@/components/shared/AppButton.vue';
import AppChip from '@/components/shared/AppChip.vue';

async function logout() {
	useAuthStore()
		.logout()
		.then((_) => {
			router.push('/login');
		});
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
