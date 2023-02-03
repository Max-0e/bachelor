import { RouteRecordRaw } from 'vue-router';

import Dashboard from '@/components/Dashboard/Dashboard.vue';
import Levels from '@/views/Levels.vue';
import OrganizationView from '@/views/OrganizationView.vue';
import levelViewRoutes from './MainChildrenRoutes/levels';
// import { groupsResolver } from './resolver/groups.resolver';
// import { levelsResolver } from './resolver/level.resolver';

export const organizationRoutes: Array<RouteRecordRaw> = [
	{
		path: '',
		name: 'Organization',
		component: OrganizationView,
	},
	{
		path: ':organizationId',
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
				// beforeEnter: levelsResolver,
			},
			{
				path: 'levelView/:levelId',
				children: levelViewRoutes,
				// beforeEnter: [groupsResolver, levelsResolver],
			},
		],
	},
];
