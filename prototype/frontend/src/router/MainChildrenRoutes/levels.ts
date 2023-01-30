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
		component: GroupView,
	},
];

export default levelViewRoutes;
