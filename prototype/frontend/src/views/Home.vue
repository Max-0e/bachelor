<template>
	<div class="home">
		<img alt="Vue logo" src="../assets/logo.png" />
		<AppButton @click="logout()">Logout</AppButton>
	</div>
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