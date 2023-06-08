import { createPinia } from 'pinia';
import 'virtual:windi.css';
import { createApp } from 'vue';
import Toast, { PluginOptions } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import 'windi.css';
import App from './App.vue';

import { useAppStore } from './store/app';
import { useAuthStore } from './store/auth';

import { Chart, registerables } from 'chart.js';
import { router } from './router';

Chart.register(...registerables);

const app = createApp(App);

app.use(createPinia());

await useAuthStore().checkAuthorization();
useAppStore().setDarkModeFromLocalStorage();
useAppStore().setProgressTypeFromLocalStorage();

const toastOptions: PluginOptions = {};
app.use(Toast, toastOptions);
app.use(router);
app.mount('#app');
