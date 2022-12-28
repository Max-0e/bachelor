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
import { validationType } from '@/enums/validationType.enum';
import { inputRef } from '@/intefaces/form.interface';
import { IRegisterPayload } from '@/intefaces/registerPayload.interface';
import { ToastType } from '@/intefaces/toastConfig';
import router from '@/router';
import authService from '@/services/auth.service';
import { useAppStore } from '@/store/app';
import { ref } from 'vue';
import { FormGroup } from '../shared/Input/formGroup';

const email = inputRef();
const username = inputRef();
const password = inputRef();
const password2 = inputRef();

const registerPayload = ref<IRegisterPayload>({
	email: '',
	username: '',
	password: '',
});

const formGroup = new FormGroup([email, username, password, password2]);

const password2value = ref<string>('');

async function register() {
	if (formGroup.validate())
		await authService.register(registerPayload.value).then((_) => {
			useAppStore().showToastOnRouting = {
				toastType: ToastType.SUCCESS,
				toastContent:
					'Registration Successfull. Please confirm your E-Mail-Adress',
			};
			router.push('login');
		});
}
</script>
<style scoped></style>
