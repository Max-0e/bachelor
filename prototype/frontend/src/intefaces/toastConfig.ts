export interface IToastConfig {
	toastType: ToastType;
	toastContent: string;
}

export enum ToastType {
	SUCCESS = 'success',
	ERROR = 'error',
	WARNING = 'warning',
	INFO = 'info',
}
