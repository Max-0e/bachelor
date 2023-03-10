<template>
	<AppInputField
		ref="email"
		:validation-types="[validationType.required, validationType.email]"
		type="email"
		name="email"
		id="email"
		placeholder="E-Mail"
		autocomplete="email"
		label="E-Mail" />
	<AppInputField
		:validation-types="[validationType.required]"
		ref="username"
		type="text"
		name="username"
		id="username"
		placeholder="Username"
		autocomplete="username"
		label="Username" />
	<AppInputField
		:validation-types="[validationType.required, validationType.matches]"
		:match="formGroup.formObjects.password2.value"
		ref="password"
		type="password"
		name="password"
		id="password"
		placeholder="Password"
		autocomplete="new-password"
		label="Password" />
	<AppInputField
		:validation-types="[validationType.required, validationType.matches]"
		:match="formGroup.formObjects.password.value"
		ref="password2"
		type="password"
		name="password2"
		id="password2"
		placeholder="Reenter Password"
		autocomplete="new-password"
		label="Reenter Password" />
	<div class="mt-15 mb-15">
		<AppButton @click="register()">Register</AppButton>
	</div>

	<router-link to="login">Login</router-link>
</template>
<script setup lang="ts">
import { FormGroup } from '@/components/shared/Input/formGroup';
import { validationType } from '@/enums/validationType.enum';
import { inputRef } from '@/interfaces/form.interface';
import { ToastType } from '@/interfaces/toastConfig';
import authService from '@/services/auth.service';
import { useAppStore } from '@/store/app';
import { RouterLink, useRouter } from 'vue-router';

const email = inputRef();
const username = inputRef();
const password = inputRef();
const password2 = inputRef();

const formGroup = new FormGroup({ email, username, password, password2 });

async function register() {
	if (formGroup.validate())
		await authService.register(formGroup.value).then((_) => {
			useAppStore().showToastOnRouting = {
				toastType: ToastType.SUCCESS,
				toastContent:
					'Registration Successfull. Please confirm your E-Mail-Adress',
			};
			useRouter().push('login');
		});
}
</script>
<style scoped></style>
