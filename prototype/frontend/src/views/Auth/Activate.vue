<template></template>
<script setup lang="ts">
import { ToastType } from '@/intefaces/toastConfig';
import router from '@/router';
import authService from '@/services/auth.service';
import { useAppStore } from '@/store/app';
import { onMounted } from 'vue';

const activationToken = router.currentRoute.value.params.activationToken;

onMounted(
	async () =>
		await authService
			.activate(activationToken as string)
			.then((_) => {
				useAppStore().showToastOnRouting = {
					toastType: ToastType.SUCCESS,
					toastContent:
						'Successfully activated your Account. You can now log in.',
				};
				router.push('login');
			})
			.catch((_) => {
				useAppStore().showToastOnRouting = {
					toastType: ToastType.ERROR,
					toastContent: 'Activation Unsuccessful',
				};
				router.push('login');
			})
);
</script>
<style scoped></style>
