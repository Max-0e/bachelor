import { RouteRecordRaw } from "vue-router"

import Initiatives from '@/components/Initiatives/Initiatives.vue';
import InitiativeDetails from '@/components/Initiatives/InitiativeDetails.vue';

const initiativesRoutes: Array<RouteRecordRaw> = [
    {
        path: '',
        name: 'Initiatives',
        component: Initiatives,
    },
    {
        path: ':id',
        name: 'InitiativeDetails',
        component: InitiativeDetails,
    },
]

export default initiativesRoutes;