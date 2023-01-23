import ForgotPassword from '@/views/Auth/ForgotPassword.vue';
import Login from '@/views/Auth/Login.vue';
import Register from '@/views/Auth/Register.vue';
import ResetPassword from '@/views/Auth/ResetPassword.vue';
import { RouteRecordRaw } from 'vue-router';

const authRoutes: Array<RouteRecordRaw> = [
	{
		path: 'login',
		name: 'Login',
		component: Login,
	},
	{
		path: 'register',
		name: 'Register',
		component: Register,
	},
	{
		path: 'forgotPassword',
		name: 'ForgotPassword',
		component: ForgotPassword,
	},
	{
		path: 'resetPassword/:resetToken',
		name: 'ResetPassword',
		component: ResetPassword,
	},
];

export default authRoutes;
