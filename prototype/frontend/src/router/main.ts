import { RouteRecordRaw } from 'vue-router';

import Profile from '@/components/Profile/Profile.vue';
import Settings from '@/components/Settings/Settings.vue';
import { organizationRoutes } from './organization';
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
