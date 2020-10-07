import { Pipe, PipeTransform } from '@angular/core';
import { ErrorMsgsExtractorService } from './error-msgs-extractor.service';

@Pipe({
  name: 'extractErrorMsgs',
})
export class ExtractErrorMsgsPipe implements PipeTransform {

  constructor(private errorMsgsExtractorService: ErrorMsgsExtractorService) {}

  transform(value: any, whiteList: string[]): string[] {
    const keys: string[] = value ? Object.keys(value) : [];
    const messages: string[] = keys
    .filter((key) => {
      return whiteList.length > 0 ? whiteList.includes(key) : true;
    })
    .map((key) => {
      return this.errorMsgsExtractorService.extract(key);
    });

    return messages;
  }

}
