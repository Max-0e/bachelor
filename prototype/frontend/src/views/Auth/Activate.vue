<template></template>
<script setup lang="ts">
import { ToastType } from '@/intefaces/toastConfig';
import authService from '@/services/auth.service';
import { useAppStore } from '@/store/app';
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

const activationToken = useRouter().currentRoute.value.params.activationToken;

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
				useRouter().push('login');
			})
			.catch((_) => {
				useAppStore().showToastOnRouting = {
					toastType: ToastType.ERROR,
					toastContent: 'Activation Unsuccessful',
				};
				useRouter().push('login');
			})
);
</script>
<style scoped></style>
