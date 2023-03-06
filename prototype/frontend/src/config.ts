export const API_URL: string =
	import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
export const DEV_MODE: boolean =
	import.meta.env.VITE_DEV_MODE === 'true' || true;

export const emailRegex =
	/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const nameRegex = /^([a-zA-Z])([ a-zA-Z])*$/;
