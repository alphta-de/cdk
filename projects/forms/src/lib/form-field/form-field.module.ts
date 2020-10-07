import { ExtractErrorMsgsPipe } from './extract-error-msgs.pipe';
import { SVG_ICONS_MAP } from './tokens';
import { SvgIconsResolverService } from './svg-icons-resolver.service';
import { ErrorMsgsExtractorService } from './error-msgs-extractor.service';
import { NgModule, ModuleWithProviders, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldComponent } from './form-field.component';
import { InputDirective } from './input.directive';

export interface FormFieldSettings {
  svgIconsMap: { [key: string]: any};
  errorMsgsExtractorServiceClass: Type<ErrorMsgsExtractorService>;
}

@NgModule({
  declarations: [FormFieldComponent, InputDirective, ExtractErrorMsgsPipe],
  imports: [
    CommonModule,
  ],
  providers: [SvgIconsResolverService],
  exports: [FormFieldComponent, InputDirective, ExtractErrorMsgsPipe]
})
export class FormFieldModule {
  static forRoot(settings: FormFieldSettings): ModuleWithProviders<FormFieldModule> {
    return {
        ngModule: FormFieldModule,
        providers: [ {
          provide: SVG_ICONS_MAP,
          useValue: settings.svgIconsMap
        }, {
          provide: ErrorMsgsExtractorService,
          useClass: settings.errorMsgsExtractorServiceClass
        }
      ]
    };
  }

  public static forChild(): ModuleWithProviders<FormFieldModule> {
    return {
      ngModule: FormFieldModule,
      providers: [
        ExtractErrorMsgsPipe
      ]
    };
  }

}



