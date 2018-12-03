import { Injectable } from '@angular/core';
import { CatFormElement } from '../models/cat-form-element.form';
import { CatFormModuleTemplate } from '../models/cat-form-module.template';

@Injectable()
export class CatFormParseTemplateService {

	private parseContent(formElement, template) {
		if (formElement.hasOwnProperty('content')) {
			template.lines.push( '<' + formElement.content + '></' + formElement.content + '>');
		}
		if (formElement.hasOwnProperty('component')) {
			console.log(formElement);
			const insertDependency = {
				'src': formElement.src,
				'component': formElement.component,
				'data': formElement
			};
			if (!template.hasOwnProperty('dependencies')) {
				template.dependencies = [];
			}
			template.dependencies.push(insertDependency);
		}
	}

	private parseElement(element, template) {
		console.log(element);
		const renderElement = element.render();
		if (!template.hasOwnProperty('lines')) {
			template.lines = [];
		}
		template.lines.push(renderElement.openTemplate);
		this.parseContent(element, template);
		/*if (element.hasOwnProperty('component')) {
			template.dependencies.push(element.component);
		}*/
		if (element.hasOwnProperty('components')) {
			element['components'].forEach((formElement: CatFormElement) => {
				this.parseElement(formElement, template);
			});
		}
		console.log('tanco element?');
		template.lines.push(renderElement.closeTemplate);
	}
	parseFormTemplate(formJSON) {
		const template = new CatFormModuleTemplate();
		formJSON
			.forEach((formElement: CatFormElement) => {
				this.parseElement(Object.values(formElement)[0], template);
			});
		return template;
	}
}
