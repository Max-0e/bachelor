<template></template>
<script setup lang="ts">
import { ToastType } from '@/intefaces/toastConfig';
import router from '@/router';
import authService from '@/services/auth.service';
import { useAppStore } from '@/store/app';

const activationToken = router.currentRoute.value.params.activationToken;

activate();
async function activate() {
	await authService
		.activate(activationToken as string)
		.then((_) => {
			useAppStore().showToastOnRouting = {
				toastType: ToastType.SUCCESS,
				toastContent: 'Successfully activated your Account. You can now log in.',
			};
			router.push('/login');
		})
		.catch((e) => {
			useAppStore().showToastOnRouting = {
				toastType: ToastType.ERROR,
				toastContent: 'Activation Unsuccessful',
			};
			router.push('/login');
		});
}
</script>
<style scoped></style>
