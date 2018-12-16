import { Injectable } from '@angular/core';
import { CatFormElement } from '../models/cat-form-element.form';
import { CatFormModuleTemplate } from '../models/cat-form-module.template';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
@Injectable()
export class CatFormParseTemplateService {

	private parseContent(formElement, template, form) {
		if (!template.hasOwnProperty('formLayout')) {
			template.formLayout = [];
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
			switch (formElement.type) {
				case 'wrapper': {
					template.formLayout.push({
						'type': formElement.type,
						'tag': 'div class="' + formElement.domClass + '"'
						// 'control': formElement.name
					});
					break;
				}
				case 'group': {
					form.addControl(formElement.name, new FormGroup({}));
					template.formLayout.push({
						'type': formElement.type,
						'tag': 'div class="' + formElement.container + '"  formGroupName="' + formElement.name + '"',
						'control': formElement.name
					});
					break;
				}
				case 'array': {
					form.addControl(formElement.name, new FormArray([]));
					template.formLayout.push({
						'type': formElement.type,
						'tag': 'div class="' + formElement.container + '" formArrayName="' + formElement.name + '"'
						// 'control': formElement.name
					});
					break;
				}
				case 'field': {
					if (form instanceof FormArray) {
						form.push(new FormControl('hola'));
						template.formLayout.push({
							'type': formElement.type,
							// 'tag': formElement.content + ' formControlName="' + (form.length - 1) + '"',
							'tag': formElement.content + ' formControlName="' + (form.length - 1) + '"',
							'close-tag': formElement.content,
							// 'formControl': form.controls[(form.length - 1)]
							// 'control': formElement.name
						});
					} else if (form instanceof FormGroup) {
						form.addControl(formElement.name, new FormControl('hola'));
						template.formLayout.push({
							'type': formElement.type,
							'tag': formElement.content + ' formControlName="' + formElement.name + '"',
							'close-tag': formElement.content,
							// 'formControl': form.controls[formElement.name]
							// 'control': formElement.name
						});
					}
					break;
				}
			}
		}
	}

	private parseElement(element, template, form) {
		const renderElement = element.render();
		let groupAdded = false;
		let keyAdded = '';

		this.parseContent(element, template, form);
		if (element.type === 'group' || element.type === 'array') {
			groupAdded = true;
			keyAdded = element.name;
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
		if (element.type !== 'field') {
			template.formLayout.push({
				'type': 'closeTag',
				'tag': 'div'
				// 'control': formElement.name
			});
		}

		// template.lines.push(renderElement.closeTemplate);
	}
	parseFormTemplate(formJSON) {
		const template = {};
		const form = {};
		console.log(formJSON)
		formJSON
			.forEach((formComposition) => {
				const formName = formComposition[0];
				const values = formComposition[1];
				form[formName] = new FormGroup({});
				template[formName] = new CatFormModuleTemplate();
				this.parseElement(Object.values(values)[0], template[formName], form[formName]);
			});
		console.log(form)
		return { template, form };
	}
}
