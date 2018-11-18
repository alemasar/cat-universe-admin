import { CatFormElement } from './cat-form-element.form';

export class CatFormTemplate extends CatFormElement {
	project: string;
	which: string;
	action: string;
	constructor (obj) {
		super(obj);
		for (const i of Object.keys(obj)) {
			this[i] = obj[i];
		}
	}
}
