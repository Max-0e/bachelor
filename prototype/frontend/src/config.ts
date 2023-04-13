export const API_URL: string =
	import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export const DEV_MODE: boolean = import.meta.env.DEV;
export const SWAGGER_DOCS_URL: string = DEV_MODE
	? 'http://localhost:3000/api-docs'
	: 'https://116.203.140.167.nip.io/api-docs';

export const emailRegex =
	/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const nameRegex = /[a-zA-Z\x7f-\xff -]*/;
