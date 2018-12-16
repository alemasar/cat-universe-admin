import { CommonModule } from '@angular/common';
import {
	Component,
	ComponentRef,
	Compiler,
	Directive,
	Input,
	NgModule,
	SimpleChanges,
	ViewContainerRef,
	ReflectiveInjector,
	ComponentFactory,
	ModuleWithComponentFactories,
	OnDestroy,
	OnChanges,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatFormMatInputTextModule } from '../material-wrappers/cat-form-mat-input-text/cat-form-mat-input-text.module';

export function createComponentFactory(compiler: Compiler, metadata: Component): Promise<ComponentFactory<any>> {
	const cmpClass = class DynamicComponent {};
	const decoratedCmp = Component(metadata)(cmpClass);

	@NgModule({
		imports: [
			CommonModule,
			RouterModule,
			FormsModule,
			ReactiveFormsModule,
			CatFormMatInputTextModule
		],
		declarations: [
			decoratedCmp
		]
	})
	class DynamicHtmlModule { }


	return compiler.compileModuleAndAllComponentsAsync(DynamicHtmlModule)
		.then((moduleWithComponentFactory: ModuleWithComponentFactories<any>) => {
			return moduleWithComponentFactory.componentFactories.find(x => x.componentType === decoratedCmp);
	});
}



/**
 * DynamicComponent is a directive to create dynamic component.
 *
 * Example:
 *
 * ```ts
 * @Component({
 *   selector: 'my-app',
 *   template: `
 *     <div *dynamicComponent="template; context: self; selector:'my-component'"></div>
 *   `
 * })
 * export class AppComponent {
 *   self = this;
 *
 *   template = `
 *   <div>
 *     <p>Dynamic Component</p>
 *   </div>`;
 * }
 * ```
 *
 * Result:
 *
 * ```html
 * <my-component>
 *    <div>
 *      <p>Dynamic Component</p>
 *    </div>
 * </my-component>
 * ```
 *
 */
@Directive({
	selector: '[appDynamicComponent]',
})
export class DynamicComponentDirective implements OnDestroy, OnChanges {
	// tslint:disable-next-line:no-input-rename
	@Input('appDynamicComponent') template: any;

	// tslint:disable-next-line:no-input-rename
	@Input('appDynamicComponentSelector') selector: string;
	// tslint:disable-next-line:no-input-rename
	@Input('appDynamicComponentContext') context: any;

	cmpRef: ComponentRef<any>;
	private moduleType: any;
	private cmpType: any;
	contDep = 0;
	factory;

	constructor(
		private vcRef: ViewContainerRef,
		private compiler: Compiler
	) {
		console.log('hola');
	}

	ngOnChanges(changes: SimpleChanges) {
		const html = this.template;
		if (!html) {
			return;
		}

		if (this.cmpRef) {
			this.cmpRef.destroy();
		}

		const compMetadata = new Component({
			selector: 'dynamic-html',
			template: '<form [formGroup]="formControls"(ngSubmit)="onSubmit()">' +
				html +
				'<button>Update Name</button>' +
				'</form>',
		});
		console.log(html)
		createComponentFactory(this.compiler, compMetadata)
			.then(factory => {
			const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
				this.cmpRef = this.vcRef.createComponent(factory, 0, injector, []);
				console.log(this.context)
				if (this.context !== null && this.context !== undefined) {
					Object.assign(this.cmpRef.instance, this.context);
					const proto = Object.getPrototypeOf(this.context);
					// don't copy default functions from plain objects
					if (proto !== undefined && proto !== null && proto !== Object.prototype) {
						const func = Object.getOwnPropertyNames(proto)
							.filter(entry => typeof this.context[entry] === 'function' && entry !== 'constructor');

						const funcMap: any = {};
						func.forEach(funcName => (funcMap[funcName] = this.context[funcName].bind(this.context)));
						Object.assign(this.cmpRef.instance, funcMap);
					}
				}
			// this.cmpRef.instance.dornaForm=this.item;
			});
	}

	ngOnDestroy() {
		if (this.cmpRef) {
			this.cmpRef.destroy();
		}

		if (this.compiler) {
			if (this.cmpType) {
				this.compiler.clearCacheFor(this.cmpType);
			}
			if (this.moduleType) {
				this.compiler.clearCacheFor(this.moduleType);
			}
		}
	}
}
