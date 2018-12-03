import { Component, OnInit, Input, Inject } from '@angular/core';
import { CatFormGetPropertiesService } from '../../../services/cat-form-get-properties.service';
import { CatFormGroupByPropertiesService } from '../../../services/cat-form-group-by-properties.service';

@Component({
	selector: 'cat-universe-form-molecule',
	templateUrl: './cat-form-molecule.component.html',
	styleUrls: ['./cat-form-molecule.component.scss'],
})
export class CatFormMoleculeComponent implements OnInit {
	@Input() molecule;
	@Input() formName;
	elements;

	constructor () { }

	ngOnInit() {
		this.elements = [];
		/*this.molecule.forEach((element) => {
			this.elements.push(element);
		});*/
		console.log("Este componente")
	}
}
