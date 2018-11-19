import {
	Component,
	OnInit,
	ViewChild,
	ViewContainerRef,
	Injector,
	NgModuleRef,
	Inject,
	AfterViewInit,
	Compiler,
	NgModule,
	EventEmitter
} from '@angular/core';
import { CatFormGroupByPropertiesService } from '../../../services/cat-form-group-by-properties.service';
import { CatFormGetPropertiesService } from '../../../services/cat-form-get-properties.service';
import { CatFormInjectModuleService } from '../../../services/cat-form-inject-module.service';
import { CatFormParseTemplateService } from '../../../services/cat-form-parse-template.service';
import { CatFormTemplate } from '../../../models/cat-form-template.form';
import { CatFormAtomComponent } from '../cat-form-atom/cat-form-atom.component';
import { from, of, BehaviorSubject, Observable, combineLatest, forkJoin, zip } from 'rxjs';
@Component({
	selector: 'app-cat-form-page',
	templateUrl: './cat-form-page.component.html',
	styleUrls: ['./cat-form-page.component.scss'],
})
export class CatFormPageComponent implements OnInit, AfterViewInit{
	@ViewChild('vc', { read: ViewContainerRef }) vc: ViewContainerRef;
	templateLoaded = new EventEmitter();
	formConfig = new CatFormTemplate({
		project: 'cat-universe',
		which: 'galaxy',
		action: 'add'
	});
	rootMolecule;
	template = '';

	constructor(
		@Inject(CatFormGetPropertiesService) private injectGetPropertiesService,
		@Inject(CatFormGroupByPropertiesService) private groupByPropertiesService,
		@Inject(CatFormInjectModuleService) private injectModuleService,
		@Inject(CatFormParseTemplateService) private parseTemplateService,
		private _compiler: Compiler,
		private _injector: Injector,
		private _m: NgModuleRef<any>
	) { }

	loadTemplate(template) {
		// this.injectModuleService.modules[this.atom.name] = this.atom;
		// console.log(this.injectModuleService.numberAtoms);
		// const numberAtomsInserted = Object.values(this.injectModuleService.modules).length;
		/*if (numberAtomsInserted === this.injectModuleService.numberAtoms[this.formName]) {
			this.injectModuleService.modules = [];
		}*/
		// console.log(this.injectModuleService.modules)
		const tmpCmp = Component({ template: template })(class { });
		const tmpModule = NgModule({ declarations: [tmpCmp] })(class { });
		this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
			.then((factories) => {
				const f = factories.componentFactories[0];
				const cmpRef = this.vc.createComponent(f);
				cmpRef.instance.name = 'dynamic';
			});

		// this.vc.createComponent(tmpCmp)
/*
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
	}

	listener() {
		console.log(this.template);
	}

	ngOnInit() {
		this.injectGetPropertiesService.getPageProperties(this.formConfig.project, this.formConfig.which, this.formConfig.action)
			.subscribe((pageJson => {
				const forms = this.injectGetPropertiesService.getProperties(pageJson[this.formConfig.project + '-' + this.formConfig.which]/*, {
					'project': this.project,
					'which': this.which,
					'action': this.action
				}*/);
				const forms$ = this.injectGetPropertiesService.getFormJson$(forms, this.formConfig);
				forkJoin(...forms$).subscribe((json) => {
					let template = '';
					console.log(json);
					json.forEach((form) => {
						const groupedFormJSON = Object.entries(this.groupByPropertiesService.groupByForm(form))[0];
						console.log(groupedFormJSON);
						const entriesFormJson = Object.entries(groupedFormJSON[1]);
						console.log(entriesFormJson);
						template += this.parseTemplateService.parseFormTemplate(entriesFormJson[0], groupedFormJSON[0]);
					});


					// console.log(this.parseTemplateService.parseFormTemplate(entriesFormJson[0], groupedFormJSON[0]));
					// this.mergedJSON = [];
					/*this.rootMolecule = [];
					this.rootMolecule[0] = {};
					this.rootMolecule[0] = Object.entries(groupedFormJSON[1]);*/
					// this.injectModuleService.numberAtoms[this.formName] = this.rootMolecule[0][0][1].numberAtoms;
					// this.template += this.parseTemplateService.parseFormTemplate(entriesFormJson[0], groupedFormJSON[0]);
					// loaded.emit();
					this.templateLoaded.emit(template);
				});
			}));
	}
	ngAfterViewInit() {
		// this.loadTemplate(this.template);
		this.templateLoaded.subscribe((tpl) => {
			console.log(this.template);
			this.loadTemplate(tpl + '<br />');
			// this.templateLoaded.complete();
		});
	}
}
