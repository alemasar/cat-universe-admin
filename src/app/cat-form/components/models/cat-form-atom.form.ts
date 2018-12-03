import { CatFormElement } from './cat-form-element.form';
import { CatFormTemplateDependency } from './cat-form-template-dependency.form';
export class CatFormAtom extends CatFormElement {
	typeField: string;
	label: string;
	constructor (obj) {
		super(obj);
		for (const i of Object.keys(obj)) {
			this[i] = obj[i];
		}
	}
}
