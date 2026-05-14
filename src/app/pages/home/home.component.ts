import { Component, ElementRef, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { TranslateappService } from '../../services/translateapp.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent implements OnInit{

  homeTitle = "";
  homeSubTitle = "";
  homeTitleMobile = "";
  homePartnerMobile = "";
  homePartnerMobile2 = "";
  memoryExercices = "";
  simpleCognitiveGames = "";
  seizureJournal = "";
  logSeizureEasily = "";
  neurologistReports = "";
  exportHealthData ="";
  statistics = "";
  medicalCare = "";
  familySupport = "";
  keepLoveOneInformed = "";
  language = "fr";
  source = "home";
  el: any;
  private touchMoved = false;

  constructor(
      public appComponent : AppComponent,
      private router : Router,
      public translate: TranslateappService,
      private elementRef: ElementRef,
      public localStorage: LocalstorageService
  ){

  }

  ngOnInit(): void {
    this.appComponent.setHome(true);
    this.translate.comp$.subscribe(
      () => {
          this.changeLanguage();
      }
    );
    //this.initElementMenu();
    this.changeLanguage();
  }

  ngAfterViewInit(){
    this.appComponent.changeTitleMobileHeader();
  }

  /*initElementMenu(){
    console.log("initElementMenu");
    document.querySelectorAll('.elementMenu').forEach(el => {
        console.log("ici");
        el.classList.remove('hovered');
        (el as HTMLElement).style.background = '';
    });
  }*/

  changeLanguage(){
    //changeLanguage when page is on front
    if(this.elementRef.nativeElement.offsetParent != null) {
      this.translate.translate.get(
        [
          'home.title',
          'home.titleMobile',
          'home.subtitle',
          'home.partnerMobile',
          'home.partnerMobile2',
          'memoryExercices',
          'simpleCognitiveGames',
          'seizureJournal',
          'logSeizureEasily',
          'neurologistReports',
          'exportHealthData',
          'statistics',
          'medicalCare',
          'familySupport',
          'keepLoveOneInformed'
        ]
      )
      .subscribe(translations => {
        this.homeTitle = translations['home.title'];
        this.homeTitleMobile = translations['home.titleMobile'];
        this.homeSubTitle = translations['home.subtitle'];
        this.homePartnerMobile = translations['home.partnerMobile'];
        this.homePartnerMobile2 = translations['home.partnerMobile2'];
        this.memoryExercices = translations['memoryExercices'];
        this.simpleCognitiveGames = translations['simpleCognitiveGames'];
        this.seizureJournal = translations['seizureJournal'];
        this.logSeizureEasily = translations['logSeizureEasily'];
        this.neurologistReports = translations['neurologistReports'];
        this.exportHealthData = translations['exportHealthData'];
        this.statistics = translations['statistics'];
        this.medicalCare = translations['medicalCare'];
        this.familySupport = translations['familySupport'];
        this.keepLoveOneInformed = translations['keepLoveOneInformed'];
        this.changeLanguageQuestionsIfStart();
      });

      this.setSourcePage();
    }
  }

  changeLanguageQuestionsIfStart(){
    let lang = localStorage.getItem("language");
    if (lang == null){
      this.language = "fr";
    }
    else{
      this.language = lang;
    }
  }

  setSourcePage(){
    this.localStorage.setSourcePage(this.source);
  }

  goTo(route:string){
    if(route === "footerComponent"){
      this.appComponent.scrollToFooterElement();
    }
    else{
      //this.initElementMenu();
      window.scroll(0,0);
      this.router.navigate([route]);
    }
  }

  onTouchStart(event: TouchEvent) {

    this.touchMoved = false;

    (event.currentTarget as HTMLElement)
      .classList.add('hovered');

  }

  onTouchMove(event: TouchEvent) {

    this.touchMoved = true;

    (event.currentTarget as HTMLElement)
      .classList.remove('hovered');

  }

  onTouchEnd(
    event: TouchEvent,
    page:string
  ) {

    const target =
      event.currentTarget as HTMLElement;

    target.classList.remove('hovered');

    if(this.touchMoved){
      return;
    }

    setTimeout(() => {

      target.classList.remove('hovered');

      this.goTo(page);

    }, 140);

  }
}
