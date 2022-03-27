import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/views/Home.vue';
import Auth from '@/views/Auth.vue';
import Login from '@/components/Auth/Login.vue';
import Register from '@/components/Auth/Register.vue';
import ResetPassword from '@/components/Auth/ResetPassword.vue';
import ForgotPassword from '@/components/Auth/ForgotPassword.vue';
import Activate from '@/components/Auth/Activate.vue';
import { useAuthStore } from '@/store/auth';
import { TYPE, useToast } from 'vue-toastification';
import { useAppStore } from '@/store/app';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		name: 'Home',
		component: Home,
	},
	{
		path: '/auth',
		name: 'Auth',
		component: Auth,
		meta: { noAuth: true },
		children: [
			{
				path: '/login',
				name: 'Login',
				component: Login,
			},
			{
				path: '/register',
				name: 'Register',
				component: Register,
			},
			{
				path: '/forgotPassword',
				name: 'ForgotPassword',
				component: ForgotPassword,
			},
			{
				path: '/resetPassword/:resetToken',
				name: 'ResetPassword',
				component: ResetPassword,
			},
		],
	},
	{
		path: '/activate/:activationToken',
		name: 'Activate',
		component: Activate,
		meta: { noAuth: true },
	},
	{
		path: '/secretPage',
		name: 'SecretPage',
		component: () => import('../views/SecretPage.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	checkToShowToast();
	if (!to.meta.noAuth && !useAuthStore().loggedIn) next({ name: 'Login' });
	else if (to.meta.noAuth && useAuthStore().loggedIn) next({ name: 'Home' });
	else next();
});

function checkToShowToast() {
	const toastConfig = useAppStore().showToastOnRouting;
	if (!!toastConfig) {
		useToast()[toastConfig.toastType](toastConfig.toastContent, { timeout: 5000 });
		useAppStore().showToastOnRouting = null;
	}
}

export default router;
