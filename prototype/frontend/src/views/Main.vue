<template>
	<nav class="fixed w-full h-15 top-0 shadow-md flex justify-between dark:(bg-dark-700)">
		<div class="flex flex-wrap">
			<h1 class="text-3xl my-auto ml-5 content-center"><router-link to="/dashboard">Prototype</router-link></h1>
			<div class="p-5 flex gap-5 items-center">
				<router-link to="/dashboard">Dashboard</router-link>
				<router-link to="/projects">Projects</router-link>
			</div>
		</div>
		<div class="flex items-center p-2 hoverForContextMenu">
			<AppChip>person</AppChip>
			<div class="contextMenu transition-all absolute top-15 right-1">
				<div class="w-full text-left px-3 py-0.5">
					<AppButton :slim="true" color="gray" class="w-full" @click="router.push('/profile')">Profile</AppButton>
				</div>
				<div class="w-full text-left px-3 py-0.5">
					<AppButton :slim="true" 
					color="gray" class="w-full" @click="router.push('/settings')">Settings</AppButton>
				</div>
				<div class="w-full text-left px-3 py-0.5">
					<AppButton :slim="true" 
					color="red" class="w-full" @click="logout()">Logout</AppButton>
				</div>
			</div>
		</div>
	</nav>
	<div class="pt-20 pb-10 p-5 h-screen">
		<router-view />
	</div>
	<footer class="fixed w-full h5 bottom-0 p-1 flex justify-between shadow-md bg-gray-100 dark:(bg-dark-100)">
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
	useAuthStore().logout().then((_) => {
		router.push('/login');
	});
}
</script>
<style scoped>
.contextMenu{
	visibility: hidden;
	transform-origin: 90% 0%;
	transform: scale(0) rotate(-50deg);
}
.hoverForContextMenu:hover .contextMenu{
	visibility: visible;
	transform: none;
}
</style>