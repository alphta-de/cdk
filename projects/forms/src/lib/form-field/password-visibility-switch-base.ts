import { EventEmitter, Directive, Output, HostListener } from '@angular/core';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export class PasswordVisibilitySwitchBase {
  private shouldBePassVisible = false;

  @Output() visibilityChange: EventEmitter<boolean> = new EventEmitter();

  @HostListener('click', ['$event.target'])
  onPasswordVisibilityChange() {
    this.shouldBePassVisible = !this.shouldBePassVisible;
    this.visibilityChange.emit(this.shouldBePassVisible);
  }
}
