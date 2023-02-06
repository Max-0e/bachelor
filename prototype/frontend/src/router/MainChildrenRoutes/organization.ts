import { RouteRecordRaw } from 'vue-router';

import Dashboard from '@/views/Dashboard.vue';
import Levels from '@/views/Levels.vue';
import OrganizationView from '@/views/OrganizationView.vue';
import { groupsResolver } from '../resolver/groups.resolver';
import { levelsResolver } from '../resolver/level.resolver';
import { tasksResolver } from '../resolver/tasks.resolver';
import levelViewRoutes from './levels';

export const organizationRoutes: Array<RouteRecordRaw> = [
	{
		path: '',
		name: 'Organization',
		component: OrganizationView,
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
				component: Dashboard,
			},
			{
				path: 'levels',
				name: 'Levels',
				component: Levels,
			},
			{
				path: 'levelView/:levelId',
				children: levelViewRoutes,
			},
		],
	},
];
