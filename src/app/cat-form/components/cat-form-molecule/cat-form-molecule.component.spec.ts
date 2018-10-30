import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatFormMoleculeComponent } from './cat-form-molecule.component';

describe('CatFormMoleculeComponent', () => {
  let component: CatFormMoleculeComponent;
  let fixture: ComponentFixture<CatFormMoleculeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatFormMoleculeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatFormMoleculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
