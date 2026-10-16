import { Component, ElementRef, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { TranslateappService } from '../../services/translateapp.service';
import { LocalstorageService } from '../../services/localstorage.service';

import {
  faUser,
  faBrain,
  faCalendarCheck,
  faShareNodes,
  faHeartPulse,
  faUserDoctor,
  faPills,
  faBookMedical,
  faChartColumn,
  faFileMedical
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  constructor(
      public appComponent : AppComponent,
      private router : Router,
      public translate: TranslateappService,
      private elementRef: ElementRef,
      public localStorage: LocalstorageService
  ){

  }

faUser = faUser;
faBrain = faBrain;
faCalendarCheck = faCalendarCheck;
faShareNodes = faShareNodes;
faHeartPulse = faHeartPulse;
faUserDoctor = faUserDoctor;
faPills = faPills;
faBookMedical = faBookMedical;
faChartColumn = faChartColumn;
faFileMedical = faFileMedical;

  ngOnInit(): void {
    this.appComponent.setHome(true);
    this.appComponent.setLanding(false);
    this.appComponent.setStartGame(false);
    this.translate.comp$.subscribe(
      () => {
          this.changeLanguage();
      }
    );
    this.changeLanguage();
  }

  changeLanguage(){
    //changeLanguage when page is on front
    /*if(this.elementRef.nativeElement.offsetParent != null) {
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
    }*/
  }

  goToRegister(): void {
    this.router.navigate(['/auth/register/patient']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToNeurologueRegister(): void {
    this.router.navigate(['/auth/register/neurologue']);
  }

  scrollToFeatures(): void {
    document.getElementById('home-features')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}
