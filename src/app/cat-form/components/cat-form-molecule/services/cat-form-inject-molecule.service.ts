import {
  Injectable, Component, NgModule
} from '@angular/core';
// import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Injectable()
export class CatFormInjectMoleculeService {
  constructor() {
  }

  addDynamicComponent(compiler, viewContainerRef) {

    const componentPath = 'cat-form-input-molecule.component';
    // Create an Observable that will create an AJAX request
    const formObs = ajax('assets/cat-universe-admin/cat-universe-galaxy-crud/pages/add-cat-universe-galaxy.page.json');
// Subscribe to create the request
    formObs.subscribe(config => {
      console.log(config.status, config.response);
      const page = config.response;
      let arrayMerge = [];
      Object.keys(page).forEach((p) => {
        Object.values(page[p])
        .map(value => {
          Object.values(value[0])
          .flatMap(v => {
            arrayMerge = arrayMerge.concat(v);
          });
        });
      });

      console.log(arrayMerge);

      const form$ = of(Object.values(arrayMerge));


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
