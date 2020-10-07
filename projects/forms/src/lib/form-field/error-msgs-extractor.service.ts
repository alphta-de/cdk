import { Injectable } from '@angular/core';

@Injectable()
export abstract class ErrorMsgsExtractorService {

  constructor() { }
  abstract extract(errorCode: string): string;
}
