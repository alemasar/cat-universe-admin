import { Injectable } from '@angular/core';
import { CatFormMolecule } from '../models/cat-form-molecule.form';
import { CatFormElement } from '../models/cat-form-element.form';


@Injectable()
export class CatFormParseTemplateService {
	template = [];
	private parseElement(element, formName) {
		this.parseFormTemplate(element, formName);
	}
	parseFormTemplate(formEntries, formName) {
		const molecule = <CatFormElement>formEntries[1];

		if (!this.template.hasOwnProperty(formName)) {
			this.template[formName] = '';
		}
		this.template[formName] += molecule.render();
		if (molecule.hasOwnProperty('atoms')) {
			molecule['atoms'].forEach((element) => {
				this.parseFormTemplate(element, formName);
			});
		}
		return this.template[formName];
	}
}
