import { RouteRecordRaw } from "vue-router"

import Projects from '@/components/Projects/Projects.vue';
import ProjectDetails from '@/components/Projects/ProjectDetails.vue';

const projectsRoutes: Array<RouteRecordRaw> = [
    {
        path: '',
        name: 'Projects',
        component: Projects,
    },
    {
        path: ':id',
        name: 'ProjectDetails',
        component: ProjectDetails,
    },
]

export default projectsRoutes;