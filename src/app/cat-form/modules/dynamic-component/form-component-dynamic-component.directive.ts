import {
	Component,
	ComponentRef,
	Compiler,
	Directive,
	Input,
	NgModule,
	SimpleChanges,
	Type,
	ViewContainerRef,
	ReflectiveInjector,
	OnDestroy,
	OnChanges,
} from '@angular/core';

import { DynamicComponentOptions } from './options';
import { forkJoin, of } from 'rxjs';

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

	private component: ComponentRef<any>;
	private moduleType: any;
	private cmpType: any;
	contDep = 0;
	factory;

	constructor(
		private options: DynamicComponentOptions,
		private vcRef: ViewContainerRef,
		private compiler: Compiler
	) {

	}

	private prepareTemplate(): string {
		return this.template.lines.join('');
	}

	private async prepareDependencies(): Promise<any> {
		const depsSRC = [];
		const deps = this.template.dependencies;
		const introducedComponent = [];
		console.log(deps);

		for (const dependency of deps) {
			if (introducedComponent.indexOf(dependency['component']) === -1) {
				introducedComponent.push(dependency['component']);
				const dep = await import('../material-wrappers/' + dependency['src'] + '/' + dependency['src'] + '.module');
				depsSRC.push(dep[dependency['component']]);
			}
		}

		return depsSRC;
	}

	private createComponentType(): Type<any> {
		const metadata = new Component({
			selector: this.selector,
			template: this.prepareTemplate(),
		});
		const cmpClass = class CmpClass {};
		return Component(metadata)(cmpClass);
	}

	private async createNgModuleType(componentType: Type<any>) {
		const dependencies = await this.prepareDependencies();
		const declarations = [].concat(
			this.options.ngModuleMetadata.declarations || []
		);
		declarations.push(componentType);

		const imports = dependencies.concat(
			this.options.ngModuleMetadata.imports || []
		);

		const moduleMeta: NgModule = {
			imports: imports,
			providers: this.options.ngModuleMetadata.providers,
			schemas: this.options.ngModuleMetadata.schemas,
			declarations: declarations,
		};
		return NgModule(moduleMeta)(class ModuleClass {});
	}

	getData() {
		const data = this.template.dependencies[this.contDep];
		this.contDep++;
		return data;
	}

	async ngOnChanges(changes: SimpleChanges) {
		if (!this.template.lines || !this.template.dependencies) {
			return;
		}

		this.cmpType = this.createComponentType();
		this.moduleType = await this.createNgModuleType(this.cmpType);
		const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
		this.compiler.compileModuleAndAllComponentsAsync<any>(this.moduleType)
			.then(factory => {
				let cmpFactory: any;
				for (let i = factory.componentFactories.length - 1; i >= 0; i--) {
					if (factory.componentFactories[i].componentType === this.cmpType) {
						cmpFactory = factory.componentFactories[i];
						break;
					}
				}
				return cmpFactory;
			},
			error => { })
			.then(cmpFactory => {
				if (cmpFactory) {
					this.vcRef.clear();
					this.component = this.vcRef.createComponent(cmpFactory,	0, injector);
					if (this.context !== null && this.context !== undefined) {
						Object.assign(this.component.instance, this.context);
						const proto = Object.getPrototypeOf(this.context);
						// don't copy default functions from plain objects
						if (proto !== undefined && proto !== null && proto !== Object.prototype) {
							const func = Object.getOwnPropertyNames(proto)
								.filter(entry => typeof this.context[entry] === 'function' && entry !== 'constructor');

							const funcMap: any = {};
							func.forEach(funcName => (funcMap[funcName] = this.context[funcName].bind(this.context)));
							Object.assign(this.component.instance, funcMap);
						}
					}
					this.component.changeDetectorRef.detectChanges();
				}
			});
	}

	ngOnDestroy() {
		if (this.component) {
			this.component.destroy();
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
