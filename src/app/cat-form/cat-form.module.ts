import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CatFormPageComponent } from './components/cat-form-page/components/cat-form-page/cat-form-page.component';
import { CatFormInjectModuleService } from './components/services/cat-form-inject-module.service';
import { CatFormGetPropertiesService } from './components/services/cat-form-get-properties.service';
import { CatFormGroupByPropertiesService } from './components/services/cat-form-group-by-properties.service';
import { CatFormParseTemplateService } from './components/services/cat-form-parse-template.service';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatInputModule } from '@angular/material';

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
		MatListModule,
		MatInputModule,
		ReactiveFormsModule
	],
	declarations: [
		CatFormPageComponent
	],
	providers: [
		CatFormInjectModuleService,
		CatFormGetPropertiesService,
		CatFormGroupByPropertiesService,
		CatFormParseTemplateService
	],
	bootstrap: [CatFormPageComponent],
})
export class CatFormModule {}
