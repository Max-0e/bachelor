import { RouteRecordRaw } from 'vue-router';

import Dashboard from '@/components/Dashboard/Dashboard.vue';
import Profile from '@/components/Profile/Profile.vue';
import Settings from '@/components/Settings/Settings.vue';
import Levels from '@/views/Levels.vue';
import levelViewRoutes from './MainChildrenRoutes/levels';
import { groupsResolver } from './resolver/groups.resolver';
import { levelsResolver } from './resolver/level.resolver';

const mainRoutes: Array<RouteRecordRaw> = [
	{
		path: 'dashboard',
		name: 'Dashboard',
		component: Dashboard,
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
	{
		path: 'levelView/:levelId',
		name: 'LevelView',
		children: levelViewRoutes,
		beforeEnter: [groupsResolver, levelsResolver],
	},
];

export default mainRoutes;
