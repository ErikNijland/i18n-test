import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import {translations} from './translations';

@Pipe({
  name: 'translate'
})
export class TranslatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  transform(key: string, locale?: string): string {
    return translations[locale || this.locale][key];
  }
}
