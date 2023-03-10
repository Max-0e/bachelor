import { InputRef } from '@/interfaces/form.interface';
import { FormObject } from './formObject';

export class FormGroup<T extends { [key: string]: InputRef }> {
	formObjects;
	objectKeys;

	constructor(inputRefs: T) {
		// TODO: there must be another way
		// fromEntries does not implicitly type to key in keyof T
		this.formObjects = Object.fromEntries(
			Object.keys(inputRefs).map((key: keyof T) => [
				key,
				new FormObject(inputRefs[key]),
			])
		) as { [key in keyof T]: FormObject };
		this.objectKeys = Object.keys(this.formObjects);
	}

	validate() {
		return this.objectKeys
			.map((objectKey) => this.formObjects[objectKey].validate())
			.every((result) => result);
	}

	get value() {
		// TODO: there must be another way
		// fromEntries does not implicitly type to key in keyof T
		return Object.fromEntries(
			this.objectKeys.map((objectKey) => [
				objectKey,
				this.formObjects[objectKey].value,
			])
		) as { [key in keyof T]: string };
	}

	clear() {
		this.objectKeys.forEach((objectKey) => {
			this.formObjects[objectKey].patchValue('');
			this.formObjects[objectKey].resetValidation();
		});
	}
}
