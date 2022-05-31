<template>
	<div>
		<AppInputField
			v-model="usernameOrEmail"
			type="text"
			name="usernameOrEmail"
			id="usernameOrEmail"
			placeholder="Username/E-Mail"
			label="Username/E-Mail" />
	</div>
	<div class="mb-15">
		<AppButton @click="requestResetLink()">Send Reset Link</AppButton>
	</div>
	<div>
		<router-link to="login">Back To Login</router-link>
	</div>
</template>
<script setup lang="ts">
import { ToastType } from '@/intefaces/toastConfig';
import router from '@/router';
import authService from '@/services/auth.service';
import { useAppStore } from '@/store/app';
import { ref } from 'vue';
import AppButton from '../shared/Input/AppButton.vue';
import AppInputField from '../shared/Input/AppInputField.vue';

const usernameOrEmail = ref('');

async function requestResetLink() {
	await authService
		.forgotPassword(usernameOrEmail.value)
		.then((_) => {
			useAppStore().showToastOnRouting = {
				toastType: ToastType.SUCCESS,
				toastContent: 'The user with the given E-Mail-Address received his reset Link if he exists.',
			};
			router.push('login');
		})
		.catch((e) => {
			return;
		});
}
</script>
<style scoped></style>
