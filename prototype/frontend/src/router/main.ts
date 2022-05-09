import { RouteRecordRaw } from 'vue-router';

import Profile from '@/components/Profile/Profile.vue';
import Settings from '@/components/Settings/Settings.vue';
import Dashboard from '@/components/Dashboard/Dashboard.vue';

import RouterNesting from '@/components/shared/RouterNesting.vue';

import { projectDetailsResolver, projectsResolver } from './resolver/projects.resolver';
import { initiativeDetailsResolver, initiativesResolver } from './resolver/initiatives.resolver';
import { objectivesResolver } from './resolver/objectives.resolver';
import objectivesRoutes from './MainChildrenRoutes/objectives';
import projectsRoutes from './MainChildrenRoutes/projects';
import initiativesRoutes from './MainChildrenRoutes/initiatives';

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
        path: 'projects',
        component: RouterNesting,
        beforeEnter: projectsResolver,
        children: projectsRoutes
    },
    {
        path: 'initiatives',
        component: RouterNesting,
        beforeEnter: [initiativesResolver, projectsResolver],
        children: initiativesRoutes
    },
    {
        path: 'objectives',
        component: RouterNesting,
        beforeEnter: [objectivesResolver, initiativesResolver, projectsResolver],
        children: objectivesRoutes
    },
];

export default mainRoutes;
