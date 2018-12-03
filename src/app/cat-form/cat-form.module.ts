import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CatFormPageComponent } from './components/cat-form-page/components/cat-form-page/cat-form-page.component';
import { CatFormGroupByPropertiesService } from './components/services/cat-form-group-by-properties.service';
import { CatFormParseTemplateService } from './components/services/cat-form-parse-template.service';
import { DynamicComponentModule } from './modules/dynamic-component/form-component-dynamic-component.module';
import { CatFormMoleculeComponent } from './components/cat-form-page/components/cat-form-molecule/cat-form-molecule.component';

import { LayoutModule } from '@angular/cdk/layout';
import {
	MatToolbarModule,
	MatButtonModule,
	MatSidenavModule,
	MatIconModule,
	MatListModule,
	MatInputModule
} from '@angular/material';

@NgModule({
	imports: [
		CommonModule,
		MatInputModule
	],
	declarations: [
		CatFormMoleculeComponent
	],
	exports: [
		CatFormMoleculeComponent
	]
})
export class SharedModule { }



@NgModule({
	imports: [
		BrowserModule,
		CommonModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		LayoutModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		ReactiveFormsModule,
		DynamicComponentModule.forRoot({
			imports: [SharedModule]
		})
	],
	declarations: [
		CatFormPageComponent
	],
	providers: [
		CatFormGroupByPropertiesService,
		CatFormParseTemplateService,
	],
	exports: [CatFormPageComponent],
	bootstrap: [],
})
export class CatFormModule {}
