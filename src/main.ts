import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { RouterModule, Routes } from '@angular/router';

import { CatGalaxyCRUDPagesModule } from './app/cat-universe-admin-pages/cat-universe-galaxy-crud/cat-universe-galaxy-crud.module';
import {
	CatGalaxyCRUDPagesComponent
} from './app/cat-universe-admin-pages/cat-universe-galaxy-crud/component/cat-universe-galaxy-crud.component';
import { environment } from './environments/environment';
import 'hammerjs';

if (environment.production) {
	enableProdMode();
}

const appRoutes: Routes = [
	{ path: '', component: CatGalaxyCRUDPagesComponent, pathMatch: 'full' }
// { path: '**', component: PageNotFoundComponent },
];

platformBrowserDynamic()
	.bootstrapModule(CatGalaxyCRUDPagesModule)
	.catch(err => console.error(err));
