import { NgControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { Directive } from '@angular/core';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class FormFieldControl<T> {
  readonly focused: boolean;
  readonly stateChanges: Observable<any>;
  readonly ngControl: NgControl | null;
  type: string;
}

