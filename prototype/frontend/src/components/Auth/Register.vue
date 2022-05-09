<template>
	<div>
		<AppInputField
			v-model="registerPayload.email"
			type="email"
			name="email"
			id="email"
			placeholder="E-Mail"
			label="E-Mail" />
	</div>
	<div>
		<AppInputField
			v-model="registerPayload.username"
			type="text"
			name="username"
			id="username"
			placeholder="Username"
			label="Username" />
	</div>
	<div>
		<AppInputField
			v-model="registerPayload.password"
			type="password"
			name="password"
			id="password"
			placeholder="Password"
			label="Password" />
	</div>
	<div>
		<AppInputField
			v-model="password2"
			type="password"
			name="password2"
			id="password2"
			placeholder="Reenter Password"
			label="Reenter Password" />
	</div>
	<div class="mt-15 mb-15">
		<AppButton @click="register()">Register</AppButton>
	</div>

	<router-link to="login">Login</router-link>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { IRegisterPayload } from '@/intefaces/registerPayload.interface';
import router from '@/router';
import authService from '@/services/auth.service';
import AppButton from '../shared/AppButton.vue';
import AppInputField from '../shared/AppInputField.vue';
import { useAppStore } from '@/store/app';
import { ToastType } from '@/intefaces/toastConfig';

const showError = ref<boolean>(false);

const registerPayload = ref<IRegisterPayload>({
	email: '',
	username: '',
	password: '',
});

const password2 = ref<string>('');

async function register() {
	await authService
		.register(registerPayload.value)
		.then((_) => {
			useAppStore().showToastOnRouting = {
				toastType: ToastType.SUCCESS,
				toastContent: 'Registration Successfull. Please confirm your E-Mail-Adress',
			};
			router.push('login');
		})
		.catch((e) => (showError.value = true));
}
</script>
<style scoped></style>
