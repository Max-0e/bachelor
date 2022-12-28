<template>
	<div>
		<AppInputField
			v-model="loginPayload.usernameOrEmail"
			:validation-types="[validationType.required]"
			ref="usernameOrEmail"
			type="text"
			name="usernameOrEmail"
			id="usernameOrEmail"
			placeholder="Username/E-Mail"
			autocomplete="username email"
			label="Username/E-Mail" />
	</div>
	<div>
		<AppInputField
			v-model="loginPayload.password"
			:validation-types="[validationType.required]"
			ref="password"
			type="password"
			name="password"
			id="password"
			placeholder="Password"
			autocomplete="current-password"
			label="Password" />
	</div>
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
import { ILoginPayload } from '@/intefaces/loginPayload.interface';
import router from '@/router';
import { useAuthStore } from '@/store/auth';

import AppButton from '../shared/Input/AppButton.vue';
import AppInputField from '../shared/Input/AppInputField.vue';

import { inputRef, InputRef } from '@/intefaces/form.interface';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';
import { useToast } from 'vue-toastification';
import { FormGroup } from '../shared/Input/formGroup';

const loginPayload = ref<ILoginPayload>({
	usernameOrEmail: '',
	password: '',
});

const usernameOrEmail: InputRef = inputRef();
const password: InputRef = inputRef();

const formGroup = new FormGroup([usernameOrEmail, password]);

function login() {
	if (!formGroup.validate()) return;
	useAuthStore()
		.login(loginPayload.value)
		.then((_) => router.push({ name: 'Dashboard' }))
		.catch((error) => useToast().error(error.message, { timeout: 5000 }));
}
</script>

<style scoped>
.register-link {
	margin-top: 20px;
}
</style>
