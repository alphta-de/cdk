import { BrowserModule } from '@angular/platform-browser';
import { Injectable, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormFieldModule, ErrorMsgsExtractorService } from 'dist/forms';

@Injectable({providedIn: 'root'})
export class AppErrorMsgsExtractorService extends ErrorMsgsExtractorService {
  constructor(
  ) {
    super();
  }

  extract(errorCode): string {
    return errorCode;
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormFieldModule.forRoot({
      svgIconsMap: {},
      errorMsgsExtractorServiceClass: AppErrorMsgsExtractorService
    }),
    FormFieldModule.forChild(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
