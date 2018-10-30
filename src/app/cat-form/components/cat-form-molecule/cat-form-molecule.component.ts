import {
   Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver, Inject
  } from '@angular/core';

import { CatFormInjectMoleculeService } from './services/cat-form-inject-molecule.service';

@Component({
  selector: 'app-cat-form-molecule',
  templateUrl: './cat-form-molecule.component.html',
  styleUrls: ['./cat-form-molecule.component.scss']
})
export class CatFormMoleculeComponent implements OnInit {
  @ViewChild('alertContainer', { read: ViewContainerRef }) container;

  constructor(@Inject(CatFormInjectMoleculeService) private injectComponentService, private resolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.injectComponentService.addDynamicComponent(this.container, this.resolver);
  }

}
