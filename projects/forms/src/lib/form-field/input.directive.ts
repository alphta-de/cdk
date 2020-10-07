import { NgControl } from '@angular/forms';
import { Directive, HostListener, Input, Optional, Self, OnInit, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { FormFieldControl } from './form-field-control';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[alInput]',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'inp',
    '[class.focused]': 'focused',
    '[class.readonly]': 'readonly',
    '[attr.id]': 'id',
  },
  providers: [{provide: FormFieldControl, useExisting: InputDirective}],
})
export class InputDirective implements FormFieldControl<any>, OnInit {
  @Input() modificatorClasses: string[] = [];

  focused: boolean;

  @Input()
  get readonly(): boolean { return this._readonly; }
  set readonly(value: boolean) { this._readonly = Boolean(value); }
  private _readonly = false;

  readonly stateChanges: Subject<void> = new Subject<void>();

  @Input()
  get type(): string { return this._type; }
  set type(value: string) {
    this._type = value || 'text';
    (this._elementRef.nativeElement as HTMLInputElement).type = this._type;
  }
  protected _type = 'text';


  @HostListener('focus', ['true'])
  @HostListener('blur', ['false'])
  // tslint:disable-next-line:typedef
  private focusChanged(isFocused: boolean) {
    if (isFocused !== this.focused && (!this.readonly || !isFocused)) {
      this.focused = isFocused;
      this.stateChanges.next();
    }
  }
  constructor(
    protected _elementRef: ElementRef<HTMLInputElement | HTMLTextAreaElement>,
    @Optional() @Self() public ngControl: NgControl,
  ) { }

  ngOnInit(): void {
    const newClasses: string[] = this.modificatorClasses.map((klass) => `inp--${klass}`);
    this._elementRef.nativeElement.classList.add(...newClasses);
  }
}
