import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatFormMatInputTextComponent } from './cat-form-mat-input-text.component';

describe('CatFormMatInputTextComponent', () => {
	let component: CatFormMatInputTextComponent;
	let fixture: ComponentFixture<CatFormMatInputTextComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CatFormMatInputTextComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CatFormMatInputTextComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
