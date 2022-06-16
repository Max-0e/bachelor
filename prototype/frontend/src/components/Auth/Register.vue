<template>
	<div>
		<AppInputField
			v-model="registerPayload.email"
			ref="email"
			:validation-types="[validationType.required, validationType.email]"
			type="email"
			name="email"
			id="email"
			placeholder="E-Mail"
			autocomplete="email"
			label="E-Mail" />
	</div>
	<div>
		<AppInputField
			v-model="registerPayload.username"
			:validation-types="[validationType.required]"
			ref="username"
			type="text"
			name="username"
			id="username"
			placeholder="Username"
			autocomplete="username"
			label="Username" />
	</div>
	<div>
		<AppInputField
			v-model="registerPayload.password"
			:validation-types="[validationType.required, validationType.matches]"
			:match="password2value"
			ref="password"
			type="password"
			name="password"
			id="password"
			placeholder="Password"
			autocomplete="new-password"
			label="Password" />
	</div>
	<div>
		<AppInputField
			v-model="password2value"
			:validation-types="[validationType.required, validationType.matches]"
			:match="registerPayload.password"
			ref="password2"
			type="password"
			name="password2"
			id="password2"
			placeholder="Reenter Password"
			autocomplete="new-password"
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
import { validationType } from '@/enums/validationType.enum';
import router from '@/router';
import authService from '@/services/auth.service';
import AppButton from '../shared/Input/AppButton.vue';
import AppInputField from '../shared/Input/AppInputField.vue';
import { useAppStore } from '@/store/app';
import { ToastType } from '@/intefaces/toastConfig';

const email = ref<InstanceType<typeof AppInputField> | null>(null);
const username = ref<InstanceType<typeof AppInputField> | null>(null);
const password = ref<InstanceType<typeof AppInputField> | null>(null);
const password2 = ref<InstanceType<typeof AppInputField> | null>(null);

const registerPayload = ref<IRegisterPayload>({
	email: '',
	username: '',
	password: '',
});

const password2value = ref<string>('');

async function register() {
	if (validateForm()) 
		await authService
			.register(registerPayload.value)
			.then((_) => {
				useAppStore().showToastOnRouting = {
					toastType: ToastType.SUCCESS,
					toastContent: 'Registration Successfull. Please confirm your E-Mail-Adress',
				};
				router.push('login');
			})
}

function validateForm(){
	const emailValid = email.value!.validate();
	const usernameValid = username.value!.validate();
	const passwordValid = password.value!.validate();
	const password2Valid = password2.value!.validate();
	return emailValid && usernameValid && passwordValid && password2Valid;
}
</script>
<style scoped></style>
