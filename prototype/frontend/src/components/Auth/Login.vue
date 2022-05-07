<template>
	<div>
		<AppInputField
			v-model="loginPayload.usernameOrEmail"
			type="text"
			name="usernameOrEmail"
			id="usernameOrEmail"
			placeholder="Username/E-Mail"
			label="Username/E-Mail" />
	</div>
	<div>
		<AppInputField
			v-model="loginPayload.password"
			type="password"
			name="password"
			id="password"
			placeholder="Password"
			label="Password" />
	</div>
	<div class="mb-15">
		<AppButton @click="login()">Login</AppButton>
	</div>
	<div>
		<router-link to="/register">Register</router-link>
	</div>
	<div>
		<router-link to="/forgotPassword">Forgot Password?</router-link>
	</div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ILoginPayload } from '@/intefaces/loginPayload.interface';
import router from '@/router';
import { useAuthStore } from '@/store/auth';

import AppButton from '../shared/AppButton.vue';
import AppInputField from '../shared/AppInputField.vue';

import { useToast } from 'vue-toastification';

const loginPayload = ref<ILoginPayload>({
	usernameOrEmail: '',
	password: '',
});

function login() {
	useAuthStore()
		.login(loginPayload.value)
		.then((_) => router.push('/dashboard'))
		.catch((error) => useToast().error(error.message, { timeout: 5000 }));
}
</script>

<style scoped>
.register-link {
	margin-top: 20px;
}
</style>
