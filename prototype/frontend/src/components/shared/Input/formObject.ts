import { InputRef } from '@/intefaces/form.interface';

export class FormObject {
	inputRef;
	constructor(inputRef: InputRef) {
		this.inputRef = inputRef;
	}

	patchValue(value: string) {
		this.inputRef.value?.patchValue(value);
	}

	validate() {
		return this.inputRef.value?.validate() ?? false;
	}
	resetValidation() {
		this.inputRef.value?.resetValidation();
	}

	get value() {
		return this.inputRef.value?.getInputValue() ?? '';
	}
}