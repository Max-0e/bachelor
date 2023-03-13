import { RouteRecordRaw } from 'vue-router';

import Profile from '@/views/Profile.vue';
import Settings from '@/views/Settings.vue';
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
		component: Profile,
	},
	{
		path: 'settings',
		name: 'Settings',
		component: Settings,
	},
];

export default mainRoutes;
