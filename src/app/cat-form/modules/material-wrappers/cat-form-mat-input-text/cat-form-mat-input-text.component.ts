import {
	Component,
	OnInit,
	forwardRef,
	Input,
	ViewEncapsulation,
	OnChanges,
	AfterViewInit,
	ViewChild,
	ElementRef,
	Renderer,
	ChangeDetectorRef,
	ChangeDetectionStrategy
} from '@angular/core';
import { FormControl, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
	selector: 'cat-form-mat-input-text',
	templateUrl: './cat-form-mat-input-text.component.html',
	styleUrls: ['./cat-form-mat-input-text.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{ provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => CatFormMatInputTextComponent), multi: true },
		{ provide: NG_VALIDATORS, useExisting: forwardRef(() => CatFormMatInputTextComponent), multi: true }
	]
})
export class CatFormMatInputTextComponent implements  ControlValueAccessor, OnChanges, OnInit {
	@Input() form;
	@Input("inputValue") _inputValue;
	@ViewChild('textInput') textInput: ElementRef;
	defaultClass = 'form-control';
	defaultValue = 'hola';

	propagateChange: any = () => { };
	onTouched: any = () => { };
	validateFn: any = () => { };

	constructor(private renderer: Renderer) {

	}

	//get accessor
	get inputValue(): any {
		return this._inputValue;
	};

	// set accessor including call the onchange callback
	set inputValue(val: any) {
		this._inputValue = val;
		this.propagateChange(val);
	}

	ngOnChanges(inputs) {
		this.validateFn = function () {
			return null;
		};
		this.propagateChange(this.inputValue);
	}

	// From ControlValueAccessor interface
	writeValue(value) {
		console.log(value)
		this.inputValue = this.defaultValue;
	}
	// From ControlValueAccessor interface
	registerOnChange(fn: any) {
		this.propagateChange = fn;
	}
	// From ControlValueAccessor interface
	registerOnTouched(fn: any) {
		this.onTouched = fn;
	}

	validate(c: FormControl) {
		return this.validateFn(c);
	}

	ngOnInit() {
		// this.dornaField.class = this.defaultClass + " " + this.dornaField.class;
		console.log('hola')
		
		// this.propagateChange(this.defaultValue);
	}
}
