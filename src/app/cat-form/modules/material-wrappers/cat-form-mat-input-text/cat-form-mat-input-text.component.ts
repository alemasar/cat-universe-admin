import {
	Component,
	OnInit,
	Input,
	AfterViewInit
} from '@angular/core';
import { CatFormGetDataService } from '../../../components/services/cat-form-input-data.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'cat-form-mat-input-text',
	templateUrl: './cat-form-mat-input-text.component.html',
	styleUrls: ['./cat-form-mat-input-text.component.scss'],
})
export class CatFormMatInputTextComponent implements OnInit, AfterViewInit {
	@Input() element;
	@Input() index;
	subscription: Subscription;
	placeholder: string;

	constructor (private getDataElementService: CatFormGetDataService) {
	this.subscription = getDataElementService.dataElement$.subscribe(
		data => {
			console.log(data);
			this.placeholder = data['data']['label'];
			this.subscription.unsubscribe();
		});
	}
	ngOnInit() {
		console.log();
		const data = this.getDataElementService.getDataElement();
		this.placeholder = data['data']['label'];
	}

	ngAfterViewInit() {
	}
}
