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
import { ref } from 'vue';
import { ILoginPayload } from '@/intefaces/loginPayload.interface';
import { validationType } from '@/enums/validationType.enum';
import router from '@/router';
import { useAuthStore } from '@/store/auth';

import AppButton from '../shared/Input/AppButton.vue';
import AppInputField from '../shared/Input/AppInputField.vue';

import { useToast } from 'vue-toastification';

const loginPayload = ref<ILoginPayload>({
	usernameOrEmail: '',
	password: '',
});

const usernameOrEmail = ref<InstanceType<typeof AppInputField> | null>(null);
const password = ref<InstanceType<typeof AppInputField> | null>(null);

function login() {
	if (validateForm())
		useAuthStore()
			.login(loginPayload.value)
			.then((_) => router.push({ name: 'Dashboard' }))
			.catch((error) => useToast().error(error.message, { timeout: 5000 }));
}

function validateForm() {
	// due to weird automatic selfoptimization the following code
	// would not be completlz executed if the first function already returns false
	// return password.value!.validate() && usernameOrEmail.value!.validate();
	// so this explicit validation is needed;
	const usernameOrEmailValid = usernameOrEmail.value!.validate();
	const passwordValid = password.value!.validate();
	return usernameOrEmailValid && passwordValid;
}
</script>

<style scoped>
.register-link {
	margin-top: 20px;
}
</style>
