import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatFormPageMoleculeComponent } from './cat-form-page-molecule.component';

describe('CatFormPageMoleculeComponent', () => {
	let component: CatFormPageMoleculeComponent;
	let fixture: ComponentFixture<CatFormPageMoleculeComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CatFormPageMoleculeComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CatFormPageMoleculeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
