import AuthVue from '@/layouts/Auth.vue';
import MainVue from '@/layouts/Main.vue';
import authRoutes from '@/router/auth';
import mainRoutes from '@/router/main';
import { useAppStore } from '@/store/app';
import { useAuthStore } from '@/store/auth';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { useToast } from 'vue-toastification';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/home',
		name: 'Home',
		component: () => import('@/views/HomePage.vue'),
		meta: { noAuth: true },
	},
	{
		path: '/app',
		name: 'Main',
		component: MainVue,
		children: mainRoutes,
	},
	{
		path: '/auth',
		name: 'Auth',
		component: AuthVue,
		meta: { noAuth: true },
		children: authRoutes,
	},
	{
		path: '/activate/:activationToken',
		name: 'Activate',
		meta: { noAuth: true },
		component: () => import('@/views/Auth/Activate.vue'),
	},
	{
		path: '/notFound',
		name: 'NotFound',
		component: () => import('@/views/NotFound.vue'),
	},
];

export const router = createRouter({
	history: createWebHashHistory(),
	routes,
});

router.beforeEach((to, _, next) => {
	checkToShowToast();
	if (to.path == '/') next({ name: 'Home' });
	if (to.matched.length === 0) next({ name: 'NotFound' });
	if (!to.meta.noAuth && !useAuthStore().loggedIn) next({ name: 'Login' });
	else if (to.meta.noAuth && useAuthStore().loggedIn) next({ name: 'Default' });
	else next();
});

function checkToShowToast() {
	const toastConfig = useAppStore().showToastOnRouting;
	if (!!toastConfig) {
		useToast()[toastConfig.toastType](toastConfig.toastContent, {
			timeout: 5000,
		});
		useAppStore().showToastOnRouting = null;
	}
}
