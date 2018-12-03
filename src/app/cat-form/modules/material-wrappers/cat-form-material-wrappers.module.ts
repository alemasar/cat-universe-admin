import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

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
	],
	exports: [
	]
})
export class SharedModule { }
