import { CatFormElement } from './cat-form-element.form';


export class CatFormTemplateDependency {
	openTemplate: string;
	closeTemplate: string;
	content: string;
	constructor (obj) {
		for (const i of Object.keys(obj)) {
			this[i] = obj[i];
		}
	}
}
