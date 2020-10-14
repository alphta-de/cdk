import { EventEmitter, Directive, Output, HostListener } from '@angular/core';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class PasswordVisibilitySwitchBase {
  private _shouldBePassVisible = false;
  get shouldBePassVisible(): boolean {
    return this._shouldBePassVisible;
  }

  @Output() visibilityChange: EventEmitter<boolean> = new EventEmitter();

  @HostListener('click', ['$event.target'])
  onPasswordVisibilityChange(): void {
    this._shouldBePassVisible = !this.shouldBePassVisible;
    this.visibilityChange.emit(this._shouldBePassVisible);
  }
}
