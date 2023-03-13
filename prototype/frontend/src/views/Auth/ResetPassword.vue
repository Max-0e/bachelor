<template>
	<AppInputField
		ref="password"
		type="password"
		name="password"
		id="password"
		placeholder="New Password"
		autocomplete="new-password"
		label="New Password" />
	<AppInputField
		ref="password2"
		type="password"
		name="password2"
		id="password2"
		placeholder="Reenter New Password"
		autocomplete="new-password"
		label="Reenter New Password" />
	<div class="mb-15">
		<AppButton @click="resetPassword()">Reset Password</AppButton>
	</div>
	<div>
		<router-link to="login">Back To Login</router-link>
	</div>
</template>
<script setup lang="ts">
import { FormGroup } from '@/components/shared/Input/formGroup';
import { inputRef } from '@/interfaces/form.interface';
import { ToastType } from '@/interfaces/toastConfig';
import authService from '@/services/auth.service';
import { useAppStore } from '@/store/app';
import { useRouter } from 'vue-router';

const password = inputRef();
const password2 = inputRef();

const formGroup = new FormGroup({ password, password2 });

async function resetPassword() {
	if (!formGroup.validate()) return;
	const pwdResetToken = useRouter().currentRoute.value.params
		.resetToken as string;

	await authService
		.resetPassword({
			password: formGroup.formObjects.password.value,
			pwdResetToken: pwdResetToken,
		})
		.then((_) => {
			useAppStore().showToastOnRouting = {
				toastType: ToastType.SUCCESS,
				toastContent: 'Your Password was successfully reset.',
			};
			useRouter().push('login');
		})
		.catch((_) => {
			return;
		});
}
</script>
<style scoped></style>
