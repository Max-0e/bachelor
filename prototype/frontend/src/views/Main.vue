<template>
	<nav class="fixed w-full h-15 top-0 shadow-md flex justify-between">
		<h1 class="text-3xl my-auto ml-5">Prototype</h1>
		<div>
			<router-link to="/projects">Projects</router-link>
		</div>
		<AppButton class="m-1" @click="logout()">Logout</AppButton>
	</nav>
	<div class="mt-15 mb-5 p-5">
		<router-view />
	</div>
	<footer class="fixed w-full h5 bottom-0 p-1 flex justify-between shadow-md bg-gray-100">
		<div class="flex justify-evenly">
			<span>youre logged in</span>
		</div>
	</footer>
</template>

<script setup lang="ts">
import router from '@/router';
import authService from '@/services/auth.service';
import { useAuthStore } from '@/store/auth';
import AppButton from '@/components/shared/AppButton.vue';

async function logout() {
	await authService.logout().then((_) => {
		useAuthStore().setLoggedIn(false);
		router.push('/login');
	});
}
</script>