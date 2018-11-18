import { Injectable, Component, NgModule } from '@angular/core';
import { CatFormAtom } from '../models/cat-form-atom.form';
import { CatFormMolecule } from '../models/cat-form-molecule.form';

@Injectable()
export class CatFormGroupByPropertiesService {
	countAtoms;
	groupByForm(json) {
		let concatJSON = [];
		let formName = '';
		const mergedJSON = {};
		const formJSON = {};
		json.map(molecule => {
			formName = Object.keys(molecule)[0];
			concatJSON = concatJSON.concat(Object.values(molecule)[0]);
		});
		if (!formJSON.hasOwnProperty(formName)) {
			formJSON[formName] = {};
			formJSON[formName]['atom'] = {};
			formJSON[formName]['molecule'] = {};
		}
		this.concatAtoms(concatJSON, formName, formJSON);
		this.concatMolecules(concatJSON, formName, formJSON);
		this.groupAtomsByWrapper(formName, formJSON);
		this.groupMoleculesByWrapper(formName, mergedJSON, formJSON);
		return mergedJSON;
	}


	private concatAtoms(atoms, formName, formJSON) {
		atoms
		.filter(field => field.hasOwnProperty('type') && field.type === 'field')
		.map(field => {
			const atom: CatFormAtom = new CatFormAtom(field);
			if (!formJSON[formName]['atom'].hasOwnProperty(field.name)) {
				formJSON[formName]['atom'][field.name] = {};
			}
			formJSON[formName]['atom'][field.name] = atom;
			});
		this.countAtoms = atoms.filter(field => field.hasOwnProperty('type') && field.type === 'field').length;
	}

	private concatMolecules(molecules, formName, formJSON) {
		molecules
		.filter(field => !field.hasOwnProperty('type'))
		.map(field => {
			let type = '';
			if (formJSON[formName]['atom'].hasOwnProperty(field.name)) {
				type = 'atom';
			} else {
				if (!formJSON[formName].hasOwnProperty('molecule')) {
					formJSON[formName]['molecule'] = {};
				}
				type = 'molecule';
			}
			let fieldObj = {};
			let fieldToInsert = {};
				if (formJSON[formName][type].hasOwnProperty(field.name)) {
					if (type === 'atom') {
						fieldObj = new CatFormAtom(formJSON[formName][type][field.name]);
						fieldToInsert = new CatFormAtom(field);
						formJSON[formName][type][field.name] = new CatFormAtom(Object.assign(fieldObj, fieldToInsert));
					} else if (type === 'molecule') {
						fieldObj = new CatFormMolecule(formJSON[formName][type][field.name]);
						fieldToInsert = new CatFormMolecule(field);
						formJSON[formName][type][field.name] = new CatFormMolecule(Object.assign(fieldObj, fieldToInsert));
					}
				} else {
					fieldObj = {};
					fieldToInsert = field;
					formJSON[formName][type][field.name] = new CatFormMolecule(Object.assign(fieldObj, fieldToInsert));
				}
		});
	}

	private groupAtomsByWrapper(formName, formJSON) {
		Object.values(formJSON[formName].atom).forEach((atom: CatFormAtom) => {
			if (!formJSON[formName].molecule[atom.wrapper]['atoms']) {
				formJSON[formName].molecule[atom.wrapper]['atoms'] = [];
			}
			formJSON[formName].molecule[atom.wrapper].atoms.push([atom.name, atom]);
		});
	}

	private groupMoleculesByWrapper(formName, mergedJSON, formJSON) {
		console.log(formJSON[formName].molecule)
		mergedJSON[formName] = formJSON[formName].molecule;
		Object.values(mergedJSON[formName]).forEach((molecule: CatFormMolecule) => {
			if (mergedJSON[formName][molecule.name].wrapper !== 'root') {
				if (!mergedJSON[formName][molecule.wrapper].hasOwnProperty('atoms')) {
					mergedJSON[formName][molecule.wrapper]['atoms'] = [];
				}
				mergedJSON[formName][molecule.wrapper].atoms.push([molecule.name, molecule]);
				delete mergedJSON[formName][molecule.name];
			} else {
				mergedJSON[formName][molecule.name]['numberAtoms'] = this.countAtoms;
			}
		});
	}
}
