import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(private translate: TranslateService) {
    const browserLang = translate.getBrowserLang();
    const lang = browserLang && browserLang.match(/en|uk/) ? browserLang : 'en';
    translate.use(lang);
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
