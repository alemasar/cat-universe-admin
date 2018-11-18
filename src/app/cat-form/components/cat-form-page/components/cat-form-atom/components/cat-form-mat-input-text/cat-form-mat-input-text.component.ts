import { Component, OnInit, Input, Inject } from '@angular/core';

@Component({
	selector: 'cat-universe-form-mat-input-text',
	templateUrl: './cat-form-mat-input-text.component.html',
	styleUrls: ['./cat-form-mat-input-text.component.scss'],
})
export class CatFormMatInputTextComponent implements OnInit {
	@Input() molecule;
	elements;
	constructor () { }

	ngOnInit() {
	}
}
