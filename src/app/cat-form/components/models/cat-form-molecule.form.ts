import { CatFormElement } from './cat-form-element.form';

export class CatFormMolecule extends CatFormElement {
	container: string;
	wrapper: string;
	type: string;
	atoms: [];
	domClass: string;
	numberAtoms: number;
	constructor (obj) {
		super(obj);
		for (const i of Object.keys(obj)) {
			this[i] = obj[i];
		}
		this.template = 'Molecule';
	}
}
