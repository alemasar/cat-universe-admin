export abstract class CatFormElement {
	name: string;
	template: string;

	constructor (obj: Object) {
		for (const i of Object.keys(obj)) {
			this[i] = obj[i];
		}
		this.template = 'element';
	}

	render() {
		return this.template;
	}
}
