import {
	Component,
	OnInit,
	Input,
	Compiler,
	NgModule,
	AfterViewInit,
	ViewContainerRef,
	NgModuleRef,
	ViewChild,
	Injector,
	Optional,
	SkipSelf
} from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatInputModule } from '@angular/material';
import { CatFormInjectModuleService } from '../../../services/cat-form-inject-module.service';

@Component({
	selector: 'cat-universe-form-atom',
	templateUrl: './cat-form-atom.component.html',
	styleUrls: ['./cat-form-atom.component.scss'],
})
export class CatFormAtomComponent implements OnInit, AfterViewInit {
	@Input() atom;
	@Input() formName;
	@ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;

	constructor (
		private _compiler: Compiler,
		private _injector: Injector,
		private _m: NgModuleRef<any>,
		private injectModuleService: CatFormInjectModuleService
	) { }

	ngOnInit() {
		/*@Component({template})
			class TemplateComponent {}
			@NgModule({declarations: [TemplateComponent]})
			class TemplateModule {}
			const mod = compiler.compileModuleAndAllComponentsSync(TemplateModule);
			const factory = mod.componentFactories.find((comp) =>
				comp.componentType === TemplateComponent
			);
			const dynamicComponent = viewContainerRef.createComponent(factory);
			Object.assign(dynamicComponent.instance, properties);*/
	}
	ngAfterViewInit() {
		import(
				'./components/cat-form-mat-' + this.atom.src + '/cat-form-mat-' + this.atom.src + '.component'
		).then((component) => {
			this.injectModuleService.modules[this.atom.name] = this.atom;
			// console.log(this.injectModuleService.numberAtoms);
			const numberAtomsInserted = Object.values(this.injectModuleService.modules).length;
			/*if (numberAtomsInserted === this.injectModuleService.numberAtoms[this.formName]) {
				this.injectModuleService.modules = [];
			}*/
			console.log(this.injectModuleService.modules)
			/*const tmpCmp = Component({
				selector: 'cat-universe-form-mat-input-text',
				templateUrl: './components/cat-form-mat-input-text/cat-form-mat-input-text.component.html',
				styleUrls: ['./components/cat-form-mat-input-text/cat-form-mat-input-text.component.scss'],
			})(component[this.atom.component]);
			// this.vc.createComponent(tmpCmp)

			const tmpModule = NgModule({ declarations: [tmpCmp], 	imports: [
				LayoutModule,
				MatToolbarModule,
				MatButtonModule,
				MatSidenavModule,
				MatIconModule,
				MatListModule,
				MatInputModule,
			]
			})(class TemplateModule {});
			console.log(tmpModule);
			this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
				.then((factories) => {
					const f = factories.componentFactories[0];
					const cmpRef = this.vc.createComponent(f);
					cmpRef.instance.name = 'dynamic';
				});*/
		});
	}
}
