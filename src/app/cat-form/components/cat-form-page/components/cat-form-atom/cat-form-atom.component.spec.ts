import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatFormAtomComponent } from './cat-form-atom.component';

describe('CatFormAtomComponent', () => {
	let component: CatFormAtomComponent;
	let fixture: ComponentFixture<CatFormAtomComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CatFormAtomComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CatFormAtomComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
