import {
	Component,
	OnInit,
} from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatInputModule } from '@angular/material';
import { CatFormInjectModuleService } from '../../../services/cat-form-inject-module.service';

@Component({
	selector: 'cat-universe-form-atom',
	templateUrl: './cat-form-atom.component.html',
	styleUrls: ['./cat-form-atom.component.scss'],
})
export class CatFormAtomComponent implements OnInit {

	constructor (
	) { }

	ngOnInit() {
	}
}
