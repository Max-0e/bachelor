import { RouteRecordRaw } from "vue-router"

import Objectives from '@/components/Objectives/Objectives.vue';
import ObjectiveDetails from '@/components/Objectives/ObjectiveDetails.vue';

const objectivesRoutes: Array<RouteRecordRaw> = [
    {
        path: '',
        name: 'Objectives',
        component: Objectives,
    },
    {
        path: ':id',
        name: 'ObjectiveDetails',
        component: ObjectiveDetails,
    },
]

export default objectivesRoutes;