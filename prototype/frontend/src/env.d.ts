/// <reference types="vite/client" />
interface ImportMetaEnv {
	readonly API_URL: string;
	readonly DEV_MODE: boolean;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
declare module '*.vue' {
	import { DefineComponent } from 'vue';
	// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
	const component: DefineComponent<{}, {}, any>;
	export default component;
}
