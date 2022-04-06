import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'windi.css';
import 'vue-toastification/dist/index.css';
import authService from './services/auth.service';
import storageService from './services/storage.service';
import { useAuthStore } from './store/auth';
import Toast, { PluginOptions } from 'vue-toastification';

const app = createApp(App);
app.use(createPinia());

if (storageService.getHasCookie()) {
	await authService.authorize()
	.then(_ => useAuthStore().setLoggedIn(true))
	.catch(_ => useAuthStore().setLoggedIn(false));
}

const toastOpions: PluginOptions = {};
app.use(Toast, toastOpions);
app.use(router);
app.mount('#app');
