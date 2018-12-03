import {
	Component,
	OnInit,
	ViewChild,
	ViewContainerRef,
	Inject,
	EventEmitter,
	Input
} from '@angular/core';
import { CatFormGroupByPropertiesService } from '../../../services/cat-form-group-by-properties.service';
import { CatFormParseTemplateService } from '../../../services/cat-form-parse-template.service';
import { CatFormGetDataService } from '../../../services/cat-form-input-data.service';
import { CatFormTemplate } from '../../../models/cat-form-template.form';
@Component({
	selector: 'app-cat-form-page',
	templateUrl: './cat-form-page.component.html',
	styleUrls: ['./cat-form-page.component.scss'],
	providers: [CatFormGetDataService]
})
export class CatFormPageComponent implements OnInit {
	@ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;
	@Input() formConfig: CatFormTemplate;
	@Input() jsonForm: {};
	templateLoaded = new EventEmitter();
	template = {};
	context = {};

	constructor(
		@Inject(CatFormGroupByPropertiesService) private groupByPropertiesService,
		@Inject(CatFormParseTemplateService) private parseTemplateService,
		@Inject(CatFormGetDataService) private getFormDataService,
	) {
		this.templateLoaded.subscribe((tpl) => {
			this.getFormDataService.setData(tpl.dependencies);
			this.template = tpl;
		});
	}

	ngOnInit() {
		console.log('Init del page component');
		const groupedFormJSON = this.groupByPropertiesService.groupByForm(Object.values(this.jsonForm[this.formConfig.which]));
		const template = this.parseTemplateService.parseFormTemplate(Object.values(groupedFormJSON));
		this.context = groupedFormJSON;
		this.templateLoaded.emit(template);
	}
}
