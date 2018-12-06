import { Injectable, Component, NgModule } from '@angular/core';
import { CatFormAtom } from '../models/cat-form-atom.form';
import { CatFormMolecule } from '../models/cat-form-molecule.form';

@Injectable()
export class CatFormGroupByPropertiesService {
	groupByForm(json) {
		const concatJSON = [];
		const formJSON = {};
		json.forEach(form => {
			const formName = Object.keys(form[0])[0];
			if (!formJSON.hasOwnProperty(formName)) {
				formJSON[formName] = {};
			}
			concatJSON[formName] = concatJSON.concat(...form.map(properties => properties[formName]));
			this.concatJSON(concatJSON[formName], formJSON[formName]);
			formJSON[formName] = this.filterJSONbetweenAtomsAndMolecules(formJSON[formName]);
		});
		console.log(formJSON);
		return formJSON;
	}


	private concatJSON(atoms, formJSON) {
		const atomsValue = Object.values(atoms);
		atomsValue
			.forEach(field => {
				if (!formJSON.hasOwnProperty(field['name'])) {
					formJSON[field['name']] = {};
				}
				Object.assign(formJSON[field['name']], field);
			});
	}

	private filterJSONbetweenAtomsAndMolecules(formJSON) {
		const values = Object.values(formJSON);
		let fieldObj;
		const fieldToInsert = {};

		values.forEach((value) => {
			if (value['type'] === 'field') {
				fieldObj = new CatFormAtom(value);
			} else {
				fieldObj = new CatFormMolecule(value);
			}

			fieldToInsert[value['name']] = {};
			fieldToInsert[value['name']] = fieldObj;
			if (fieldToInsert.hasOwnProperty(value['wrapper'])) {
				if (!fieldToInsert[value['wrapper']].hasOwnProperty('components')) {
					fieldToInsert[value['wrapper']]['components'] = [];
				}
				fieldToInsert[value['wrapper']]['components'].push({
					name: value
				});
			} else {
				if (formJSON.hasOwnProperty(value['wrapper'])) {
					if (!formJSON[value['wrapper']].hasOwnProperty('components')) {
						formJSON[value['wrapper']]['components'] = [];
					}
					formJSON[value['wrapper']]['components'].push(fieldObj);
				}
			}
		});
		Object.values(fieldToInsert)
			.filter(field => field['wrapper'] !== 'root')
			.map((field) => {
				delete fieldToInsert[field['name']];
			});
		return fieldToInsert;
	}
}
