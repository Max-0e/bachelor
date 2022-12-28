<template>
	<div>
		<AppInputField
			v-model="payload.usernameOrEmail"
			:validation-types="[validationType.required]"
			ref="usernameOrEmail"
			type="text"
			name="usernameOrEmail"
			id="usernameOrEmail"
			placeholder="Username/E-Mail"
			autocomplete="username email"
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
import { validationType } from '@/enums/validationType.enum';
import { inputRef } from '@/intefaces/form.interface';
import { ToastType } from '@/intefaces/toastConfig';
import router from '@/router';
import authService from '@/services/auth.service';
import { useAppStore } from '@/store/app';
import { FormGroup } from '../shared/Input/formGroup';

const payload = ref({
	usernameOrEmail: '',
});
const usernameOrEmail = inputRef();
const formGroup = new FormGroup([usernameOrEmail]);

async function requestResetLink() {
	if (!formGroup.validate()) return;
	console.log(formGroup.validate());

	await authService
		.forgotPassword(payload.value.usernameOrEmail)
		.then((_) => {
			useAppStore().showToastOnRouting = {
				toastType: ToastType.SUCCESS,
				toastContent:
					'The user with the given E-Mail-Address received his reset Link if he exists.',
			};
			router.push('login');
		})
		.catch((e) => {
			return;
		});
}
</script>
<style scoped></style>
