import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CatGalaxyCRUDPagesComponent } from './cat-universe-galaxy-crud.component';

describe('CatGalaxyCRUDPagesComponent', () => {
  let component: CatGalaxyCRUDPagesComponent;
  let fixture: ComponentFixture<CatGalaxyCRUDPagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatGalaxyCRUDPagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatGalaxyCRUDPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
