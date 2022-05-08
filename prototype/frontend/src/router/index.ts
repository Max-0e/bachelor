import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Main from '@/views/Main.vue';
import Auth from '@/views/Auth.vue';
import authRoutes from '@/router/auth';
import Activate from '@/components/Auth/Activate.vue';
import Projects from '@/components/Projects/Projects.vue';
import Initiatives from '@/components/Initiatives/Initiatives.vue';
import InitiativeDetails from '@/components/Initiatives/InitiativeDetails.vue';
import Profile from '@/components/Profile/Profile.vue';
import Settings from '@/components/Settings/Settings.vue';
import ProjectDetails from '@/components/Projects/ProjectDetails.vue';
import Dashboard from '@/components/Dashboard/Dashboard.vue';
import NotFound from '@/views/NotFound.vue';
import { useAuthStore } from '@/store/auth';
import { useToast } from 'vue-toastification';
import { useAppStore } from '@/store/app';
import { projectDetailsResolver, projectsResolver } from './resolver/projects.resolver';
import { initiativeDetailsResolver, initiativesResolver } from './resolver/initiatives.resolver';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/app',
		name: 'Main',
		component: Main,
		children: [
			{
				path: '/dashboard',
				name: 'Dashboard',
				component: Dashboard,
			},
			{
				path: '/profile',
				name: 'Profile',
				component: Profile,
			},
			{
				path: '/Settings',
				name: 'Settings',
				component: Settings,
			},
			{
				path: '/dashboard',
				name: 'Dashboard',
				component: Dashboard,
			},
			{
				path: '/projects',
				name: 'Projects',
				component: Projects,
				beforeEnter: projectsResolver,
			},
			{
				path: '/projects/:id',
				name: 'ProjectDetails',
				component: ProjectDetails,
				beforeEnter: projectDetailsResolver,
			},
			{
				path: '/initiatives',
				name: 'Initiatives',
				component: Initiatives,
				beforeEnter: [initiativesResolver, projectsResolver],
			},
			{
				path: '/initiatives/:id',
				name: 'InitiativeDetails',
				component: InitiativeDetails,
				beforeEnter: [initiativesResolver, projectsResolver],
			},
		],
	},
	{
		path: '/auth',
		name: 'Auth',
		component: Auth,
		meta: { noAuth: true },
		children: authRoutes,
	},
	{
		path: '/activate/:activationToken',
		name: 'Activate',
		component: Activate,
		meta: { noAuth: true },
	},
	{
		path: '/notFound',
		name: 'NotFound',
		component: NotFound,
	},
	// {
	// 	path: '/secretPage',
	// 	name: 'SecretPage',
	// 	component: () => import('../views/SecretPage.vue'),
	// },
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

router.beforeEach((to, from, next) => {
	checkToShowToast();
	if (to.path == '/') next({ name: 'Main' });
	if (to.matched.length === 0) next({ name: 'NotFound' });
	if (!to.meta.noAuth && !useAuthStore().loggedIn) next({ name: 'Login' });
	else if (to.meta.noAuth && useAuthStore().loggedIn) next({ name: 'Main' });
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
