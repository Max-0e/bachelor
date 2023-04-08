import { RouteRecordRaw } from 'vue-router';

import { organizationRoutes } from './MainChildrenRoutes/organization';
import { organizationsResolver } from './resolver/organizations.resolver';

const mainRoutes: Array<RouteRecordRaw> = [
	{
		path: '',
		name: 'default',
		redirect: '/app/organization',
	},
	{
		path: 'organization',
		beforeEnter: [organizationsResolver],
		children: organizationRoutes,
	},
	{
		path: 'profile',
		name: 'Profile',
		component: () => import('@/views/Profile.vue'),
	},
	{
		path: 'settings',
		name: 'Settings',
		component: () => import('@/views/Settings.vue'),
	},
];

export default mainRoutes;
