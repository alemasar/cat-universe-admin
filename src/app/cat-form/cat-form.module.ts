import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CatFormMoleculeComponent } from './components/cat-form-molecule/cat-form-molecule.component';
import {
  CatFormInputMoleculeComponent
} from './cat-form-molecule-src/components/cat-form-input-molecule/cat-form-input-molecule.component';
import { CatFormInjectMoleculeService } from './components/cat-form-molecule/services/cat-form-inject-molecule.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [CatFormMoleculeComponent, CatFormInputMoleculeComponent],
  providers: [ CatFormInjectMoleculeService ],
  entryComponents: [CatFormInputMoleculeComponent],
  bootstrap: [CatFormMoleculeComponent]
})
export class CatFormModule { }
