import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeFrExtra from '@angular/common/locales/extra/fr';
import localeNl from '@angular/common/locales/nl';
import localeNlExtra from '@angular/common/locales/extra/nl';
import { TranslatePipe } from './translate/translate.pipe';

registerLocaleData(localeFr, 'fr', localeFrExtra);
registerLocaleData(localeNl, 'nl', localeNlExtra);

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    // { provide: LOCALE_ID, useValue: 'nl-NL' },
    { provide: LOCALE_ID, useFactory: getLocale },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

function getLocale() {
  const supportedLocales = ['en-US', 'fr-FR', 'nl-NL'];
  const defaultLocale = 'en-US';

  const currentUrl = new URL(window.location.href);
  const locale = currentUrl.searchParams.get('locale');
  const isLocaleSupported = supportedLocales.includes(locale);

  return isLocaleSupported ? locale : defaultLocale;
}
