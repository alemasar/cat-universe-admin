import { Component, OnInit, Input, Inject } from '@angular/core';
import { CatFormGetPropertiesService } from '../../../services/cat-form-get-properties.service';
import { CatFormGroupByPropertiesService } from '../../../services/cat-form-group-by-properties.service';
import { CatFormInjectModuleService } from '../../../services/cat-form-inject-module.service';

@Component({
	selector: 'cat-universe-form-page-molecule',
	templateUrl: './cat-form-page-molecule.component.html',
	styleUrls: ['./cat-form-page-molecule.component.scss'],
})
export class CatFormPageMoleculeComponent implements OnInit {
	@Input() form;
	@Input() formConfig;
	@Input() formName;

	rootMolecule;
	constructor (
		@Inject(CatFormGetPropertiesService) private getPropertiesService,
		@Inject(CatFormGroupByPropertiesService) private groupByPropertiesService,
		@Inject(CatFormInjectModuleService) private injectModuleService
	) { }

	ngOnInit() {
		console.log(this.formName);
		const form$ = this.getPropertiesService.getAtomsUrl(this.form, this.formConfig);
		const formJSON$ = this.getPropertiesService.mergeFormProperties(form$);

		formJSON$.subscribe((json) => {
			const groupedFormJSON = Object.entries(this.groupByPropertiesService.groupByForm(json))[0];
			// this.mergedJSON = [];
			this.rootMolecule = [];
			this.rootMolecule[0] = {};
			this.rootMolecule[0] = Object.entries(groupedFormJSON[1]);

			this.injectModuleService.numberAtoms[this.formName] = this.rootMolecule[0][0][1].numberAtoms;
		});
	}
}
