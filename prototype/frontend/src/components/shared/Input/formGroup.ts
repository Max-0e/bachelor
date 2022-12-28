import { InputRef } from '@/intefaces/form.interface';

export class FormGroup {
	fields;

	constructor(fields: InputRef[]) {
		this.fields = fields;
	}

	validate() {
		const validationResult: boolean[] = [];
		this.fields.forEach((field) =>
			validationResult.push(field.value!.validate())
		);
		return validationResult.every((result) => result);
	}
}
