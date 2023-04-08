import { RouteRecordRaw } from 'vue-router';

import { jiraProjectResolver } from '../resolver/jira-projects.resolver';

const levelViewRoutes: Array<RouteRecordRaw> = [
	{
		path: '',
		name: 'LevelView',
		component: () => import('@/views/LevelView.vue'),
	},
	{
		path: 'projects',
		children: [
			{
				path: '',
				name: 'Projects',
				beforeEnter: jiraProjectResolver,
				component: () => import('@/views/Projects.vue'),
			},
			{
				path: ':groupId',
				name: 'ProjectDetails',
				component: () => import('@/views/ProjectLayout.vue'),
				children: [
					{
						path: 'dashboard',
						name: 'ProjectDashboard',
						component: () => import('@/views/Project/ProjectDashboard.vue'),
					},
					{
						path: 'board',
						name: 'ProjectBoard',
						component: () =>
							import('@/components/Tasks/AlternativeTaskList.vue'),
					},
					{
						path: 'backlog',
						name: 'ProjectBacklog',
						component: () => import('@/components/Tasks/TaskList.vue'),
					},
					{
						path: 'epics',
						name: 'Epics',
						component: () => import('@/views/Project/Epics.vue'),
					},
				],
			},
		],
	},
	{
		path: 'group/:groupId',
		name: 'GroupView',
		component: () => import('@/components/Groups/GroupView.vue'),
	},
];

export default levelViewRoutes;
