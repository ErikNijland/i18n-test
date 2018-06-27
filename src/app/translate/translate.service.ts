import {Inject, Injectable, LOCALE_ID} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  sayHi(): string {
    const translations = {
      'en-US': 'Hi',
      'fr-FR': 'Bonjour',
      'nl-NL': 'Hallo'
    };

    return translations[this.locale];
  }
}
