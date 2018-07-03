import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, LOCALE_ID, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {registerLocaleData} from '@angular/common';
import { TranslatePipe } from './translate/translate.pipe';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [
    { provide: APP_INITIALIZER, useValue: setLocale, multi: true },
    { provide: LOCALE_ID, useFactory: getLocale },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

function setLocale() {
  return new Promise(async (resolve) => {
    const locale = getLocale();

    if (locale === 'en-US') {
      // This is the default locale, the data is already available without importing anything
      resolve();

      return;
    }

    const localeFileNameConfig = {
      'nl-NL': 'nl',
      'fr-FR': 'fr'
    };
    const localeId = localeFileNameConfig[locale];

    const localeSourceCode = await fetchData(`http://localhost:4200/assets/locales/${localeId}.js`);
    const localeExtraSourceCode = await fetchData(`http://localhost:4200/assets/locales/extra/${localeId}.js`);

    const localeData = getLocaleData(localeSourceCode);
    const localeExtraData = getLocaleData(localeExtraSourceCode);

    registerLocaleData(localeData, localeId, localeExtraData);

    resolve();
  });
}

function getLocale() {
  const supportedLocales = ['en-US', 'fr-FR', 'nl-NL'];
  const defaultLocale = 'en-US';

  const currentUrl = new URL(window.location.href);
  const locale = currentUrl.searchParams.get('locale');
  const isLocaleSupported = supportedLocales.includes(locale);

  return isLocaleSupported ? locale : defaultLocale;
}

function fetchData(url) {
  return fetch(url).then((response) => response.text());
}

function getLocaleData(functionBody: string) {
  const f = Function('module', 'exports', functionBody);

  const module = {
    exports: {
      default: null
    }
  };

  f(module, module.exports);

  return module.exports.default;
}

function getLanguage(locale: string): string {
  const [ language ] = locale.split('-');

  return language;
}
