import { RouteRecordRaw } from 'vue-router';

const authRoutes: Array<RouteRecordRaw> = [
	{
		path: 'login',
		name: 'Login',
		component: () => import('@/views/Auth/Login.vue'),
	},
	{
		path: 'register',
		name: 'Register',
		component: () => import('@/views/Auth/Register.vue'),
	},
	{
		path: 'forgotPassword',
		name: 'ForgotPassword',
		component: () => import('@/views/Auth/ForgotPassword.vue'),
	},
	{
		path: 'resetPassword/:resetToken',
		name: 'ResetPassword',
		component: () => import('@/views/Auth/ResetPassword.vue'),
	},
];

export default authRoutes;
