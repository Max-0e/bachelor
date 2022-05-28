import { createApp, vModelCheckbox } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
// import 'windi.css';
import 'virtual:windi.css';
import 'vue-toastification/dist/index.css';
import { useAuthStore } from './store/auth';
import Toast, { PluginOptions } from 'vue-toastification';
import { useAppStore } from './store/app';

import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const app = createApp(App);
app.use(createPinia());

await useAuthStore().checkAuthorization();
useAppStore().setDarkModeFromLocalStorage();

const toastOptions: PluginOptions = {};
app.use(Toast, toastOptions);
app.use(router);
app.mount('#app');
