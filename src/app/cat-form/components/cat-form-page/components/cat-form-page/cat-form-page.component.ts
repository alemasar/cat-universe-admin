import {
	Component,
	OnInit,
	ViewChild,
	ViewContainerRef,
	Inject,
	AfterViewInit
} from '@angular/core';
import { CatFormGroupByPropertiesService } from '../../../services/cat-form-group-by-properties.service';
import { CatFormGetPropertiesService } from '../../../services/cat-form-get-properties.service';
import { CatFormInjectModuleService } from '../../../services/cat-form-inject-module.service';
import { CatFormParseTemplateService } from '../../../services/cat-form-parse-template.service';
import { CatFormTemplate } from '../../../models/cat-form-template.form';

@Component({
	selector: 'app-cat-form-page',
	templateUrl: './cat-form-page.component.html',
	styleUrls: ['./cat-form-page.component.scss'],
})
export class CatFormPageComponent implements OnInit {
	formConfig = new CatFormTemplate({
		project: 'cat-universe',
		which: 'galaxy',
		action: 'add'
	});
	rootMolecule;

	constructor(
		@Inject(CatFormGetPropertiesService) private injectGetPropertiesService,
		@Inject(CatFormGroupByPropertiesService) private groupByPropertiesService,
		@Inject(CatFormInjectModuleService) private injectModuleService,
		@Inject(CatFormParseTemplateService) private parseTemplateService
	) {}

	ngOnInit() {
		this.injectGetPropertiesService.getPageProperties(this.formConfig.project, this.formConfig.which, this.formConfig.action)
			.subscribe((pageJson => {
				const forms = this.injectGetPropertiesService.getProperties(pageJson[this.formConfig.project + '-' + this.formConfig.which]/*, {
					'project': this.project,
					'which': this.which,
					'action': this.action
				}*/);
				this.injectGetPropertiesService.getFormJson$(forms, this.formConfig)
					.forEach((form$) => {
						form$.subscribe((json) => {
							const groupedFormJSON = Object.entries(this.groupByPropertiesService.groupByForm(json))[0];
							console.log(groupedFormJSON);
							const entriesFormJson = Object.entries(groupedFormJSON[1]);
							console.log(entriesFormJson);

							console.log(this.parseTemplateService.parseFormTemplate(entriesFormJson[0], groupedFormJSON[0]));
							// this.mergedJSON = [];
							/*this.rootMolecule = [];
							this.rootMolecule[0] = {};
							this.rootMolecule[0] = Object.entries(groupedFormJSON[1]);*/
							// this.injectModuleService.numberAtoms[this.formName] = this.rootMolecule[0][0][1].numberAtoms;
						});
					});
			}));
	}
}
