import { CatFormElement } from './cat-form-element.form';

export class CatFormAtom extends CatFormElement {
	container: string;
	wrapper: string;
	typeField: string;
	type: string;
	label: string;
	component: string;
	src: string;
	constructor (obj) {
		super(obj);
		for (const i of Object.keys(obj)) {
			this[i] = obj[i];
		}
		this.template = 'Atom';
	}
	render() {
		return 'Atom';
	}
}
