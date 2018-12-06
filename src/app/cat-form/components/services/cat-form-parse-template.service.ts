import { Injectable } from '@angular/core';
import { CatFormElement } from '../models/cat-form-element.form';
import { CatFormModuleTemplate } from '../models/cat-form-module.template';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
@Injectable()
export class CatFormParseTemplateService {

	private parseContent(formElement, template, form) {
		if (formElement.hasOwnProperty('content')) {
			template.lines.push('<' + formElement.content + '></' + formElement.content + '>');
		}
		if (formElement.hasOwnProperty('component')) {
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
		if (formElement.hasOwnProperty('type')) {
			if (formElement.type === 'group') {
				form.addControl(formElement.name, new FormGroup({}));
			} else if (formElement.type === 'array') {
				form.addControl(formElement.name, new FormArray([]));
			} else if (formElement.type === 'field') {
				if (form instanceof FormArray) {
					form.push(new FormControl([]));
				} else if (form instanceof FormGroup) {
					form.addControl(formElement.name, new FormControl([]));
				}
			}
		}
	}

	private parseElement(element, template, form) {
		const renderElement = element.render();
		let groupAdded = false;
		let keyAdded = '';

		if (!template.hasOwnProperty('lines')) {
			template.lines = [];
		}
		template.lines.push(renderElement.openTemplate);

		if (element.type !== 'group' && element.type !== 'array' && element.type !== 'field') {
			this.parseContent(element, template, form);
		} else {
			this.parseContent(element, template, form);
			if (element.type === 'group' || element.type === 'array') {
				groupAdded = true;
				keyAdded = element.name;
			}
		}

		if (element.hasOwnProperty('components')) {
			element['components'].forEach((formElement: CatFormElement) => {
				if (groupAdded) {
					this.parseElement(formElement, template, form.controls[keyAdded]);
				} else {
					this.parseElement(formElement, template, form);
				}

			});
		}
		template.lines.push(renderElement.closeTemplate);
	}
	parseFormTemplate(formJSON) {
		const template = new CatFormModuleTemplate();
		const form = {};

		formJSON
			.forEach((formComposition) => {
				const formName = formComposition[0];
				const values = formComposition[1];
				form[formName] = new FormGroup({});
				this.parseElement(Object.values(values)[0], template, form[formName]);
			});
		return template;
	}
}
