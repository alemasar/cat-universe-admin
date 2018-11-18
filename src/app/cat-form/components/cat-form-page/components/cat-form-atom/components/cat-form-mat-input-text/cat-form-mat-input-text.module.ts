import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatInputModule } from '@angular/material';
import { CatFormMatInputTextComponent } from './cat-form-mat-input-text.component';

@NgModule({
	imports: [
		BrowserModule,
		CommonModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,
		MatToolbarModule,
		MatButtonModule,
		MatSidenavModule,
		MatIconModule,
		MatListModule,
		MatInputModule,
		LayoutModule,
		ReactiveFormsModule
	],
	declarations: [
	],
	providers: [
	],
	bootstrap: [CatFormMatInputTextComponent],
})
export class CatFormModule { }

