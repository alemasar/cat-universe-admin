import { NgModule, ModuleWithProviders, Compiler, COMPILER_OPTIONS, CompilerFactory, Optional } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { JitCompilerFactory } from '@angular/platform-browser-dynamic';

import { DynamicComponentDirective } from './form-component-dynamic-component.directive';
import { DynamicComponentOptions } from './options';



export function createCompiler(compilerFactory: CompilerFactory) {
	return compilerFactory.createCompiler();
}

/**
 * Setup for DynamicComponentDirective
 *
 * ```ts
 * @NgModule({
 *   imports: [
 *     DynamicComponentModule.forRoot({
 *       imports: [CommonModule]
 *     })
 *   ],
 * })
 * class AppModule {}
 * ```
 */
@NgModule({
	declarations: [DynamicComponentDirective],
	exports: [DynamicComponentDirective],
})

export class DynamicComponentModule {
	static forRoot(metadata: NgModule): ModuleWithProviders {
		return {
			ngModule: DynamicComponentModule,
			providers: [
				{provide: COMPILER_OPTIONS, useValue: {}, multi: true},
				{provide: CompilerFactory, useClass: JitCompilerFactory, deps: [COMPILER_OPTIONS]},
				{provide: Compiler, useFactory: createCompiler, deps: [CompilerFactory]},
				{
					provide: DynamicComponentOptions, useValue: {
						ngModuleMetadata: metadata,
					}
				},
			],
		};
	}
}
