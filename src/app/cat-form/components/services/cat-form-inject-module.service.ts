import { Injectable, Component, NgModule } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class CatFormInjectModuleService {
	modules = [];

	constructor () { }

	moduleCreator(moduleCreatorTools, moduleCreatorParameters, componentsCreatorParameters) {
		const componentPath = 'cat-form-input-molecule.component';
		// Create an Observable that will create an AJAX request

			/*.pipe(flatMap(config => {
			console.log(config);
			const page = config;
			let arrayMerge$ = [];
			Object.keys(page).forEach(p => {
				Object.keys(page[p]).forEach(forms => {
					//          .map(forms => {
					Object.keys(page[p][forms]).forEach(form => {
						console.log(page[p][forms][form]);
						Object.keys(page[p][forms][form]).map(propertie => {
							console.log(propertie);
							let urls = [];
							urls = page[p][forms][form][propertie].map(
								jsonPropertie => {
									return this.http.get(
										'assets/cat-universe-admin/' +
										p +
										'-crud/pages/' +
										propertie +
										'/' +
										forms +
										'.' +
										jsonPropertie +
										'.json'
									);
								}
							);
							arrayMerge$ = arrayMerge$.concat(urls);
						});
					});
				});
				//        });
			});
			console.log(arrayMerge$);
			return forkJoin(...arrayMerge$);*/
			/*
				.pipe(flatMap(json => {
					console.log(json);
					return json;
				}));
*/
		// }));

		// import('../../../cat-form-molecule-src/components/cat-form-input-molecule/' + componentPath).then(component => {

		/*
			const factory = factoryResolver.resolveComponentFactory(component['CatFormInputMoleculeComponent']);
			const dynamicComponent = factory.create(viewContainerRef.parentInjector);
			viewContainerRef.insert(dynamicComponent.hostView);
			*/

		/*      @Component({template})
			class TemplateComponent {}
			@NgModule({declarations: [TemplateComponent]})
			class TemplateModule {}
			const mod = compiler.compileModuleAndAllComponentsSync(TemplateModule);
			const factory = mod.componentFactories.find((comp) =>
				comp.componentType === TemplateComponent
			);
			const dynamicComponent = viewContainerRef.createComponent(factory);
			Object.assign(dynamicComponent.instance, properties);*/

		// };
	}

	// If properties are changed at a later stage, the change detection
	// may need to be triggered manually:
	// component.changeDetectorRef.detectChanges();
}
