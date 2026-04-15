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
    const language = localStorage.getItem("language");
    translate.setFallbackLang('fr');
    translate.addLangs(['fr', 'en']);
    if (!language || language=="fr"){
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
