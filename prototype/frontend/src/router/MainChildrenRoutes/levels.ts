import { RouteRecordRaw } from 'vue-router';

import GroupView from '@/views/GroupView.vue';
import LevelView from '@/views/LevelView.vue';

const levelViewRoutes: Array<RouteRecordRaw> = [
	{
		path: '',
		name: 'LevelView',
		component: LevelView,
	},
	{
		path: 'group/:groupId',
		name: 'GroupView',
		component: GroupView,
	},
];

export default levelViewRoutes;
