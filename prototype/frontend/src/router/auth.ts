import { RouteRecordRaw } from "vue-router";
import Login from '@/components/Auth/Login.vue';
import Register from '@/components/Auth/Register.vue';
import ResetPassword from '@/components/Auth/ResetPassword.vue';
import ForgotPassword from '@/components/Auth/ForgotPassword.vue';

const authRoutes: Array<RouteRecordRaw> = [
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
    {
        path: '/register',
        name: 'Register',
        component: Register,
    },
    {
        path: '/forgotPassword',
        name: 'ForgotPassword',
        component: ForgotPassword,
    },
    {
        path: '/resetPassword/:resetToken',
        name: 'ResetPassword',
        component: ResetPassword,
    },
]

export default authRoutes;