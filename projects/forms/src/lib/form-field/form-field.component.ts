import { PasswordVisibilitySwitchBase } from './password-visibility-switch-base';

import { AfterViewInit, ChangeDetectorRef, Component, ContentChild, Input, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/forms';
import { SvgIconsResolverService } from './svg-icons-resolver.service';
import { FormFieldControl } from './form-field-control';
import { ExtractErrorMsgsPipe } from './extract-error-msgs.pipe';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'form-field',
    '[class.focused]': '_control.focused',
    '[class.ng-untouched]': 'shouldForward("untouched")',
    '[class.ng-touched]': 'shouldForward("touched")',
    '[class.ng-pristine]': 'shouldForward("pristine")',
    '[class.ng-dirty]': 'shouldForward("dirty")',
    '[class.ng-valid]': 'shouldForward("valid")',
    '[class.ng-invalid]': 'shouldForward("invalid")',
    '[class.ng-pending]': 'shouldForward("pending")',
  },
  encapsulation: ViewEncapsulation.None
})
export class FormFieldComponent implements OnInit, AfterViewInit {
  get isLabelUp(): boolean {
    return this._control.focused ||  ( this._control.ngControl ? this._control.ngControl.value : false );
  }

  private _explicitFormFieldControl: FormFieldControl<any>;

  @ContentChild(FormFieldControl, {static: true}) _controlStatic: FormFieldControl<any>;
  get _control(): FormFieldControl<any> {
    return this._explicitFormFieldControl ||  this._controlStatic;
  }
  set _control(value) {
    this._explicitFormFieldControl = value;
  }

  private _modificatorClasses: string[] = [];

  @Input()
  set modificatorClasses(classList: string[]) {
    this._modificatorClasses = classList.map((klass) => `input-box--${klass}`);

  }
  get modificatorClasses(): string[] {
    return this._modificatorClasses;
  }

  @Input()
  set whiteListErrorMsgs(data: string[]) {
    if (data) {
      this._whiteListErrorMsgs = [...data];
    } else {
      this._whiteListErrorMsgs = [];
    }
  }
  get whiteListErrorMsgs(): string[] {
    return this._whiteListErrorMsgs;
  }

  private _whiteListErrorMsgs: string[] = [];

  get showHelpText(): boolean {
    return this.errorMessages.length === 0 && this.helpText.length > 0;
  }

  @ContentChild(PasswordVisibilitySwitchBase, {static: false})
  private passwordVisibilitySwitchControl: PasswordVisibilitySwitchBase;

  @Input() withErrorIcon = true;
  @Input() errorMessages: string[] = [];
  @Input() label: string;
  @Input() mainIconName: string;
  @Input() helpText = '';

  @ViewChild('mainIconContainer', { read: ViewContainerRef, static: true })
  mainIconContainer: ViewContainerRef;

  @ViewChild('errorIconContainer', { read: ViewContainerRef, static: true })
  errorIconContainer: ViewContainerRef;

  private shouldForward(prop: keyof NgControl): boolean {
    const ngControl = this._control ? this._control.ngControl : null;
    return ngControl && ngControl[prop];
  }

  constructor(
    private svgIconsResolver: SvgIconsResolverService,
    private extractErrorMsgsPipe: ExtractErrorMsgsPipe,
    private cdr: ChangeDetectorRef
    ) { }

  ngOnInit(): void {

    if (this.mainIconName) {
      try {
        this.svgIconsResolver.createIcon(this.mainIconName, this.mainIconContainer);
      } catch (e) {
        console.warn(e.message);
      }
    }

    if (this.withErrorIcon) {
      try {
        this.svgIconsResolver.createIcon('i-error', this.errorIconContainer);
      } catch (e) {
        console.warn(e.message);
      }
    }

  }

  ngAfterViewInit(): void {
    this.generateErrorMsgs();
    this.cdr.detectChanges();

    if (this._control.ngControl) {
      this._control.ngControl.control.statusChanges
      .pipe(untilDestroyed(this))
      .subscribe(this.generateErrorMsgs.bind(this));
    }

    if (this.passwordVisibilitySwitchControl) {
      this.passwordVisibilitySwitchControl.visibilityChange
      .pipe(untilDestroyed(this))
      .subscribe((visibility) => {
        this._controlStatic.type = visibility ? 'text' : 'password';
      });
    }
  }

  private generateErrorMsgs(): void {
    const errors =  this._control.ngControl ? this._control.ngControl.control.errors : {};
    this.errorMessages = this.extractErrorMsgsPipe.transform(errors, this.whiteListErrorMsgs);
  }

}
