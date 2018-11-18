import { Injectable, Component, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { from, of, BehaviorSubject, Observable, combineLatest, forkJoin, zip } from 'rxjs';
import { map, merge, mergeAll, flatMap, switchMap, combineAll, concat, take, reduce, mapTo } from 'rxjs/operators';

@Injectable()
export class CatFormGetPropertiesService {
	constructor (private http: HttpClient) { }

	getFormJson$(forms, formConfig) {
		return forms.map((form) => {
			const form$ = this.getAtomsUrl(form, formConfig);
			return this.mergeFormProperties(form$);
		}, concat());
	}

	getPageProperties(project, which, action) {
		const page$ = this.http.get(
			'assets/' + project + '-admin/' + project + '-' + which + '-crud/pages/' + action + '-' + project + '-' + which + '.page.json'
		);
		// Subscribe to create the request
		return page$;
	}

	getProperties(properties) {
		const propertie = [];
		properties.forEach(p => {
			propertie.push(Object.entries(p));
		});
		return propertie;
	}

	private generateAtomUrl(pageConfig, atomConfig) {
		const page$ = this.http.get(
			'assets/' +
			pageConfig.project + '-admin/' +
			pageConfig.project + '-' + pageConfig.which + '-crud/' +
			'pages/' +
			atomConfig.caracteristics + '/' +
			atomConfig.formMolecule + '-form/' +
			pageConfig.action + '-' + atomConfig.formMolecule + '.' + atomConfig.caracteristic + '.json'
		);
		return page$;
	}

	private getAtomsUrl(form, formConfig) {
		const configUrl = [];
		const formName = form[0][0];
		const moleculeProps = this.getProperties(form[0][1]);
		// console.log(formName);
		moleculeProps.forEach((atomProps) => {
			const atomConfig = {
				'caracteristics': atomProps[0][0],
				'formMolecule': formName,
				'caracteristic': ''
			};

			atomProps[0][1].forEach((prop) => {
				// console.log(prop);
				atomConfig.caracteristic = prop;
				configUrl.push(this.generateAtomUrl(formConfig, atomConfig));
			});
		});
		// console.log(configUrl);
		return configUrl;
	}

	private mergeFormProperties(form$) {
		return forkJoin(form$);
	}
}
