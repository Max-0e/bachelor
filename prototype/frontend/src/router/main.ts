import { RouteRecordRaw } from 'vue-router';

import Dashboard from '@/components/Dashboard/Dashboard.vue';
import Profile from '@/components/Profile/Profile.vue';
import Settings from '@/components/Settings/Settings.vue';
import Levels from '@/views/Levels.vue';
import { levelsResolver } from './resolver/level.resolver';

const mainRoutes: Array<RouteRecordRaw> = [
	{
		path: 'dashboard',
		name: 'Dashboard',
		component: Dashboard,
		// beforeEnter: [objectivesResolver, initiativesResolver, projectsResolver],
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
	{
		path: 'levels',
		name: 'Levels',
		component: Levels,
		beforeEnter: levelsResolver,
	},
	// {
	// 	path: 'projects',
	// 	component: ProjectLayout,
	// 	beforeEnter: projectsResolver,
	// 	children: projectsRoutes,
	// },
	// {
	// 	path: 'initiatives',
	// 	component: RouterNesting,
	// 	beforeEnter: [initiativesResolver, projectsResolver],
	// 	children: initiativesRoutes,
	// },
	// {
	// 	path: 'objectives',
	// 	component: RouterNesting,
	// 	beforeEnter: [objectivesResolver, initiativesResolver, projectsResolver],
	// 	children: objectivesRoutes,
	// },
];

export default mainRoutes;
