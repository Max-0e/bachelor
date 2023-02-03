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
	<AppInputField
		:validation-types="[validationType.required]"
		ref="password"
		type="password"
		name="password"
		id="password"
		placeholder="Password"
		autocomplete="current-password"
		label="Password" />
	<div class="mb-15">
		<AppButton @click="login()">Login</AppButton>
	</div>
	<div>
		<router-link to="register">Register</router-link>
	</div>
	<div>
		<router-link to="forgotPassword">Forgot Password?</router-link>
	</div>
</template>

<script setup lang="ts">
import { validationType } from '@/enums/validationType.enum';

import { useAuthStore } from '@/store/auth';

import { FormGroup } from '@/components/shared/Input/formGroup';
import { inputRef } from '@/intefaces/form.interface';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const usernameOrEmail = inputRef();
const password = inputRef();
const router = useRouter();

const formGroup = new FormGroup({
	usernameOrEmail,
	password,
});

function login() {
	if (!formGroup.validate()) return;
	useAuthStore()
		.login(formGroup.value)
		.then((_) => router.push({ name: 'Organization' }))
		.catch((error) => useToast().error(error.message, { timeout: 5000 }));
}
</script>
