import { Component, ElementRef, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { TranslateappService } from '../../services/translateapp.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  homeTitle = "";
  homeSubTitle = "";
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

  constructor(
      public appComponent : AppComponent,
      private router : Router,
      public translate: TranslateappService,
      private elementRef: ElementRef,
  ){

  }

  ngOnInit(): void {
    this.appComponent.setHome(true);
    this.translate.comp$.subscribe(
      () => {
          this.changeLanguage();
      }
    );
    this.changeLanguage();
  }

  changeLanguage(){
    //changeLanguage when page is on front
    if(this.elementRef.nativeElement.offsetParent != null) {
      this.translate.translate.get(
        [
          'home.title',
          'home.subtitle',
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
        this.homeSubTitle = translations['home.subtitle'];
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
      });

      this.manageLanguage();
    }
  }

  manageLanguage(){
    console.log("language = "+this.translate.getLanguageUsed());
  }

  goTo(route:string){
    window.scroll(0,0);
    this.router.navigate([route]);
  }
  
}
