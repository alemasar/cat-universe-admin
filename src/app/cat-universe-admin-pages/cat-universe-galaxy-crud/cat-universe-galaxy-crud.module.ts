import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CatFormModule } from '../../cat-form/cat-form.module';
import { CatGalaxyCRUDPagesComponent } from './component/cat-universe-galaxy-crud.component';

@NgModule({
	imports: [
		BrowserModule,
		CommonModule,
		BrowserAnimationsModule,
		HttpClientModule,
		CatFormModule
	],
	declarations: [
		CatGalaxyCRUDPagesComponent
	],
	providers: [
	],
	bootstrap: [CatGalaxyCRUDPagesComponent],
	exports: [CatGalaxyCRUDPagesComponent]
})
export class CatGalaxyCRUDPagesModule { }
