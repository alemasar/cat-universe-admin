import { Component, OnInit, Input, Inject } from '@angular/core';
import { CatFormGetPropertiesService } from '../../../services/cat-form-get-properties.service';
import { CatFormGroupByPropertiesService } from '../../../services/cat-form-group-by-properties.service';

@Component({
	selector: 'cat-universe-form-template',
	templateUrl: './cat-form-template.component.html',
	styleUrls: ['./cat-form-template.component.scss'],
})
export class CatFormTemplateComponent implements OnInit {
	@Input() formLayout;
	@Input() formControls;
	formControl = [];
	formGroup = [];
	template;
	self = this;

	constructor () { }

	ngOnInit() {
		/*this.molecule.forEach((element) => {
			this.elements.push(element);
		});*/
		console.log(this.formControls);
		console.log(this.formLayout);
		this.getTemplate();
	}

	getTemplate() {
		let contInputs = 0;
		let contGroups = 0;
		this.template = '';
		console.log(this.formLayout.formLayout)
		this.formLayout.formLayout.forEach((line) => {
			if (line.type === 'field') {
				this.formControl.push(line.formControl);
				this.template += '<' + line.tag + '>';
				this.template += '</' + line['close-tag'] + '>';
				contInputs++;
			} else if (line.type === 'group') {
				this.template += '<' + line.tag + '>';
				contGroups++;
			} else if (line.type === 'array') {
				this.template += '<' + line.tag + '>';
				contGroups++;
			}  else if (line.type === 'wrapper') {
				this.template += '<' + line.tag + '>';
				contGroups++;
			} else if (line.type === 'closeTag') {
				this.template += '</' + line.tag + '>';
			}
		});
	}

	onSubmit() {
		console.log(this.formControls);
	}
}
