<template>
	<div>
		<AppInputField
			v-model="password"
			type="password"
			name="password"
			id="password"
			placeholder="New Password"
			autocomplete="new-password"
			label="New Password" />
	</div>
	<div>
		<AppInputField
			v-model="password2"
			type="password"
			name="password2"
			id="password2"
			placeholder="Reenter New Password"
			autocomplete="new-password"
			label="Reenter New Password" />
	</div>
	<div class="mb-15">
		<AppButton @click="resetPassword()">Reset Password</AppButton>
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

const password = ref('');
const password2 = ref('');

async function resetPassword() {
	const pwdResetToken = router.currentRoute.value.params.resetToken as string;
	await authService
		.resetPassword({
			password: password.value,
			pwdResetToken: pwdResetToken,
		})
		.then((_) => {
			useAppStore().showToastOnRouting = {
				toastType: ToastType.SUCCESS,
				toastContent: 'Your Password was successfully reset.',
			};
			router.push('login');
		})
		.catch((_) => {
			return;
		});
}
</script>
<style scoped></style>
