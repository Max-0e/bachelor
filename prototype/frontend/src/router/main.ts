import { RouteRecordRaw } from 'vue-router';

import Projects from '@/components/Projects/Projects.vue';
import Initiatives from '@/components/Initiatives/Initiatives.vue';
import InitiativeDetails from '@/components/Initiatives/InitiativeDetails.vue';
import Objectives from '@/components/Objectives/Objectives.vue';
import ObjectivesDetails from '@/components/Objectives/ObjectiveDetails.vue';
import Profile from '@/components/Profile/Profile.vue';
import Settings from '@/components/Settings/Settings.vue';
import ProjectDetails from '@/components/Projects/ProjectDetails.vue';
import Dashboard from '@/components/Dashboard/Dashboard.vue';

import { projectDetailsResolver, projectsResolver } from './resolver/projects.resolver';
import { initiativeDetailsResolver, initiativesResolver } from './resolver/initiatives.resolver';
import { objectivesResolver } from './resolver/objectives.resolver';

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
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
    },
    {
        path: 'projects',
        name: 'Projects',
        component: Projects,
        beforeEnter: projectsResolver,
    },
    {
        path: 'projects/:id',
        name: 'ProjectDetails',
        component: ProjectDetails,
        beforeEnter: projectDetailsResolver,
    },
    {
        path: 'initiatives',
        name: 'Initiatives',
        component: Initiatives,
        beforeEnter: [initiativesResolver, projectsResolver],
    },
    {
        path: 'initiatives/:id',
        name: 'InitiativeDetails',
        component: InitiativeDetails,
        beforeEnter: [initiativesResolver, projectsResolver],
    },
    {
        path: 'objectives',
        name: 'Objectives',
        component: Objectives,
        beforeEnter: [initiativesResolver, projectsResolver, objectivesResolver],
    },
    {
        path: 'objectives/:id',
        name: 'ObjectivesDetails',
        component: ObjectivesDetails,
        beforeEnter: [initiativesResolver, projectsResolver, objectivesResolver],
    },
];

export default mainRoutes;
