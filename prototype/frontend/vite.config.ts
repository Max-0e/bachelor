import { defineConfig } from 'vite';
import WindiCSS from 'vite-plugin-windicss';
// @ts-ignore
import path from 'path';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [vue(), WindiCSS()],
	// @ts-ignore
	resolve: { alias: { '@': path.resolve(__dirname, './src') } },
	server: {
		port: 8080,
	},
});
