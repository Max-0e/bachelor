import { RouteRecordRaw } from 'vue-router';

import ProjectLayoutVue from '@/layouts/ProjectLayout.vue';
import GroupView from '@/views/GroupView.vue';
import LevelView from '@/views/LevelView.vue';
import EpicsVue from '@/views/Project/Epics.vue';
import ProjectDashboardVue from '@/views/Project/ProjectDashboard.vue';
import ProjectsVue from '@/views/Projects.vue';

const levelViewRoutes: Array<RouteRecordRaw> = [
	{
		path: '',
		name: 'LevelView',
		component: LevelView,
	},
	{
		path: 'projects',
		children: [
			{
				path: '',
				name: 'Projects',
				component: ProjectsVue,
			},
			{
				path: ':groupId',
				name: 'ProjectDatails',
				component: ProjectLayoutVue,
				children: [
					{
						path: 'dashboard',
						name: 'ProjectDashboard',
						component: ProjectDashboardVue,
					},
					{
						path: 'epics',
						name: 'Epics',
						component: EpicsVue,
					},
				],
			},
		],
	},
	{
		path: 'group/:groupId',
		name: 'GroupView',
		component: GroupView,
	},
];

export default levelViewRoutes;
