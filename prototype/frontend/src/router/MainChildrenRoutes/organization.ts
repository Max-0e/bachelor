import { RouteRecordRaw } from 'vue-router';

import { groupsResolver } from '../resolver/groups.resolver';
import { levelsResolver } from '../resolver/level.resolver';
import { tasksResolver } from '../resolver/tasks.resolver';
import levelViewRoutes from './levels';

export const organizationRoutes: Array<RouteRecordRaw> = [
	{
		path: '',
		name: 'Organization',
		component: () => import('@/views/OrganizationView.vue'),
	},
	{
		path: ':organizationId',
		beforeEnter: [tasksResolver, groupsResolver, levelsResolver],
		children: [
			{
				path: '',
				name: 'blub',
				redirect: 'dashboard',
			},
			{
				path: 'dashboard',
				name: 'Dashboard',
				component: () => import('@/views/Dashboard.vue'),
			},
			{
				path: 'levels',
				name: 'Levels',
				component: () => import('@/views/Levels.vue'),
			},
			{
				path: 'levelView/:levelId',
				children: levelViewRoutes,
			},
		],
	},
];
