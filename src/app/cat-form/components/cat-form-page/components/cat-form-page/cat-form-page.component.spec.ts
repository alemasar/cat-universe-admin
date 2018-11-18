import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatFormPageComponent } from './cat-form-page.component';

describe('CatFormPageComponent', () => {
  let component: CatFormPageComponent;
  let fixture: ComponentFixture<CatFormPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatFormPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
