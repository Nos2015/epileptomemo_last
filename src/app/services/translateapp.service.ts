import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslateappService {
  TransLang: Array<string> = [];

  // Observable string sources
  private compInstance= new Subject<any>();
  // Observable string streams
  comp$ = this.compInstance.asObservable();

  constructor(public translate: TranslateService){
    let language = localStorage.getItem("language");
    translate.setFallbackLang('fr');
    translate.addLangs(['fr', 'en']);
    const browserLang = navigator.language.toLowerCase();
    const beginWithLangFr = browserLang.startsWith('fr');
    let lang = "";
    if(!language){
      if(browserLang){
        lang =  browserLang.startsWith('fr') ? 'fr': 'en';
      }
      else{
        lang = "fr";
      }
      localStorage.setItem("language",lang);
    }
    else{
      if(beginWithLangFr && language != 'fr'){
        lang = "fr";
      }
      else if(!beginWithLangFr && language == 'fr'){
        lang = "en";
      }
      else{
        lang = language;
      }
    }
    localStorage.setItem("language",lang);
    let newlanguage = localStorage.getItem("language");

    if (!newlanguage || newlanguage=="fr"){
      translate.use('fr');
    }
    else{
      translate.use('en');
    }
  }

  setTransLanguage(language: string){
    this.translate.use(language).subscribe((translations) => {
        this.compInstance.next("language");
    });
  }

  getLanguageUsed():string{
    return this.translate.getCurrentLang();
  }

  getTransLanguage(){
    this.TransLang=[...this.translate.getLangs()];
  }

  ngOnInit() {
    this.getTransLanguage();
  }
}
