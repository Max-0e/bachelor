import { ProgressType } from '@/store/app';

class StorageService {
	private objectName = 'App';

	constructor() {}

	// get hasCookie from local storage
	getHasCookie(): boolean {
		const obj = this.readObject();
		return obj.hasCookie !== undefined ? obj.hasCookie : false;
	}
	// set hasCookie
	setHasCookie(hasCookie: boolean): void {
		const obj = this.readObject();
		obj.hasCookie = hasCookie;
		this.writeObject(obj);
	}
	// get darkMode from local storage
	getDarkMode(): boolean {
		const obj = this.readObject();
		return obj.darkMode !== undefined ? obj.darkMode : true;
	}
	// set darkMode
	setDarkMode(darkMode: boolean): void {
		const obj = this.readObject();
		obj.darkMode = darkMode;
		this.writeObject(obj);
	}
	// get darkMode from local storage
	getProgressType(): ProgressType {
		const obj = this.readObject();
		return obj.progressType !== undefined ? obj.progressType : 'absolute';
	}
	// set darkMode
	setProgressType(type: ProgressType): void {
		const obj = this.readObject();
		obj.progressType = type;
		this.writeObject(obj);
	}
	// readObject -> get object from storage
	private readObject(): any {
		const obj = localStorage.getItem(this.objectName);
		return obj !== null ? JSON.parse(obj) : {};
	}
	// writeObject set object in storage
	private writeObject(obj: any): void {
		localStorage.setItem(this.objectName, JSON.stringify(obj));
	}
}

export default new StorageService();
