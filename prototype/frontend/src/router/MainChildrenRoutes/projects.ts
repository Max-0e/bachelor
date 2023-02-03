// import { RouteRecordRaw } from 'vue-router';

// import ProjectDashboard from '@/components/Projects/ProjectDashboard.vue';
// import ProjectEpics from '@/components/Projects/ProjectEpics.vue';
// import Projects from '@/components/Projects/Projects.vue';
// import ProjectSettings from '@/components/Projects/ProjectSettings.vue';
// import TaskBoard from '@/components/Tasks/AlternativeTaskList.vue';
// import TaskBacklog from '../../components/Tasks/TaskList.vue';

// import RouterNesting from '@/components/shared/RouterNesting.vue';
// import { useProjectStore } from '@/store/project';

// const projectsRoutes: Array<RouteRecordRaw> = [
// 	{
// 		path: '',
// 		name: 'Projects',
// 		component: Projects,
// 	},
// 	{
// 		path: ':id',
// 		component: RouterNesting,
// 		children: [
// 			{
// 				path: '',
// 				name: 'ProjectDashboard',
// 				component: ProjectDashboard,
// 			},
// 			{
// 				path: 'task-board',
// 				name: 'ProjectBoard',
// 				component: TaskBoard,
// 				props: () => ({ project: useProjectStore().getCurrentProject }),
// 			},
// 			{
// 				path: 'backlog',
// 				name: 'ProjectBacklog',
// 				component: TaskBacklog,
// 				props: () => ({ project: useProjectStore().getCurrentProject }),
// 			},
// 			{
// 				path: 'epics',
// 				name: 'Epics',
// 				component: ProjectEpics,
// 				props: () => ({ project: useProjectStore().getCurrentProject }),
// 			},
// 			{
// 				path: 'settings',
// 				name: 'ProjectSettings',
// 				component: ProjectSettings,
// 				props: () => ({ project: useProjectStore().getCurrentProject }),
// 			},
// 		],
// 	},
// ];

// export default projectsRoutes;
