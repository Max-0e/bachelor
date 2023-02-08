<template>
	<AppInputField
		:validation-types="[validationType.required]"
		ref="usernameOrEmail"
		type="text"
		name="usernameOrEmail"
		id="usernameOrEmail"
		placeholder="Username/E-Mail"
		autocomplete="username email"
		label="Username/E-Mail" />
	<div class="mb-15">
		<AppButton @click="requestResetLink()">Send Reset Link</AppButton>
	</div>
	<div>
		<router-link to="login">Back To Login</router-link>
	</div>
</template>
<script setup lang="ts">
import { FormGroup } from '@/components/shared/Input/formGroup';
import { validationType } from '@/enums/validationType.enum';
import { inputRef } from '@/intefaces/form.interface';
import { ToastType } from '@/intefaces/toastConfig';
import authService from '@/services/auth.service';
import { useAppStore } from '@/store/app';
import { useRouter } from 'vue-router';

const usernameOrEmail = inputRef();
const formGroup = new FormGroup({ usernameOrEmail });

async function requestResetLink() {
	if (!formGroup.validate()) return;

	await authService
		.forgotPassword(formGroup.value.usernameOrEmail)
		.then((_) => {
			useAppStore().showToastOnRouting = {
				toastType: ToastType.SUCCESS,
				toastContent:
					'The user with the given E-Mail-Address received his reset Link if he exists.',
			};
			useRouter().push('login');
		})
		.catch((_) => {
			return;
		});
}
</script>
<style scoped></style>
