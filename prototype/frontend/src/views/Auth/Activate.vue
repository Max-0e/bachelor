<template></template>
<script setup lang="ts">
import { ToastType } from '@/interfaces/toastConfig';
import authService from '@/services/auth.service';
import { useAppStore } from '@/store/app';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

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
				router.push({ name: 'Login' });
			})
			.catch((_) => {
				useAppStore().showToastOnRouting = {
					toastType: ToastType.ERROR,
					toastContent: 'Activation Unsuccessful',
				};
				router.push({ name: 'Login' });
			})
);
</script>
<style scoped></style>
