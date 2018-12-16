import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatFormTemplateComponent } from './cat-form-template.component';

describe('CatFormTemplateComponent', () => {
	let component: CatFormTemplateComponent;
	let fixture: ComponentFixture<CatFormTemplateComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CatFormTemplateComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CatFormTemplateComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
