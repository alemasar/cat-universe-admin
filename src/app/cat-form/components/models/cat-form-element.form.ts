import { CatFormTemplateDependency } from './cat-form-template-dependency.form';
export class CatFormElement {
	name: string;
	template: CatFormTemplateDependency;
	container: string;
	wrapper: string;
	domClass: string;
	type: string;
	content: string;
	component: string;
	src: string;
	constructor (obj: Object) {
		for (const i of Object.keys(obj)) {
			this[i] = obj[i];
		}
		this.template = new CatFormTemplateDependency({
			openTemplate: 'element',
			content: 'content',
			closeTemplate: 'closeelement'
		});
	}

	render() {
		let openTemplate = '';
		let closeTemplate = '';
		let content = '';
		if (this.hasOwnProperty('container')) {
			if (this.hasOwnProperty('domClass')) {
				openTemplate += '<div class ="' + this.domClass + '">';
				closeTemplate += '</div>';
			}
			openTemplate += '<div class ="' + this.container + '">';
			if (this.hasOwnProperty('content')) {
				console.log(this.content);
				content = this.content;
			}
			closeTemplate += '</div>';
		} else if (this.wrapper === 'root') {
			openTemplate += '<div class ="' + this.domClass + '">';
			if (this.hasOwnProperty('content')) {
				console.log(this.content);
				content = this.content;
			}
			closeTemplate += '</div>';

		}

		return new CatFormTemplateDependency({
			openTemplate,
			content,
			closeTemplate
		});
	}
}
