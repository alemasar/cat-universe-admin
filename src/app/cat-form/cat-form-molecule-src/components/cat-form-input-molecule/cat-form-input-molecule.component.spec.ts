import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatFormInputMoleculeComponent } from './cat-form-input-molecule.component';

describe('CatFormInputMoleculeComponent', () => {
  let component: CatFormInputMoleculeComponent;
  let fixture: ComponentFixture<CatFormInputMoleculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatFormInputMoleculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatFormInputMoleculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
