import {
	Component,
	OnInit,
} from '@angular/core';

import * as jsonGalaxyStructure from '../pages/layout/galaxy-form/add-galaxy.structure.json';
import * as jsonGalaxyFields from '../pages/forms/galaxy-form/add-galaxy.fields.json';
import * as jsonGalaxyLabels from '../pages/forms/galaxy-form/add-galaxy.labels.json';
import * as jsonGalaxyLayout from '../pages/layout/galaxy-form/add-galaxy.layout.json';

import * as jsonWorldStructure from '../pages/layout/world-form/add-world.structure.json';
import * as jsonWorldFields from '../pages/forms/world-form/add-world.fields.json';
import * as jsonWorldLabels from '../pages/forms/world-form/add-world.labels.json';
import * as jsonWorldLayout from '../pages/layout/world-form/add-world.layout.json';


@Component({
	selector: 'app-cat-galaxy-crud-pages',
	templateUrl: './cat-universe-galaxy-crud.component.html',
	styleUrls: ['./cat-universe-galaxy-crud.component.scss'],
})
export class CatGalaxyCRUDPagesComponent implements OnInit {
	formConfig;
	formJson;
	constructor() { }
	ngOnInit() {
		this.formJson = {};
		this.formJson['galaxy'] = [];
		this.formJson['galaxy']['add-galaxy'] = [];
		this.formJson['galaxy']['add-galaxy'].push(jsonGalaxyFields['default']);
		this.formJson['galaxy']['add-galaxy'].push(jsonGalaxyLabels['default']);
		this.formJson['galaxy']['add-galaxy'].push(jsonGalaxyLayout['default']);
		this.formJson['galaxy']['add-galaxy'].push(jsonGalaxyStructure['default']);

		this.formJson['galaxy']['add-world'] = [];
		this.formJson['galaxy']['add-world'].push(jsonWorldFields['default']);
		this.formJson['galaxy']['add-world'].push(jsonWorldLabels['default']);
		this.formJson['galaxy']['add-world'].push(jsonWorldLayout['default']);
		this.formJson['galaxy']['add-world'].push(jsonWorldStructure['default']);

		this.formConfig = {
			project: 'cat-universe',
			which: 'galaxy',
			action: 'add'
		};
	}
}
