import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CatFormPageComponent } from './components/cat-form-page/components/cat-form-page/cat-form-page.component';
import { CatFormGroupByPropertiesService } from './components/services/cat-form-group-by-properties.service';
import { CatFormParseTemplateService } from './components/services/cat-form-parse-template.service';
import { CatFormMatInputTextModule } from './modules/material-wrappers/cat-form-mat-input-text/cat-form-mat-input-text.module';
import { CatFormTemplateComponent } from './components/cat-form-page/components/cat-form-template/cat-form-template.component';
import { DynamicComponentDirective } from './modules/form-component-dynamic-component/form-component-dynamic-component.directive';
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
		BrowserModule,
		CommonModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		LayoutModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatInputModule,
		CatFormMatInputTextModule,
	],
	declarations: [
		CatFormPageComponent,
		CatFormTemplateComponent,
		DynamicComponentDirective
	],
	providers: [
		CatFormGroupByPropertiesService,
		CatFormParseTemplateService,
	],
	exports: [
		CatFormPageComponent,
		CatFormTemplateComponent
	],
	bootstrap: [],
})
export class CatFormModule {}
