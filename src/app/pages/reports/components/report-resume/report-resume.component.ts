import { Component, ElementRef, OnInit } from '@angular/core';
import { TranslateappService } from '../../../../services/translateapp.service';

@Component({
  selector: 'app-report-resume',
  standalone: false,
  templateUrl: './report-resume.component.html',
  styleUrl: './report-resume.component.scss'
})
export class ReportResumeComponent implements OnInit{
  automaticSummary = "";//Résumé automatique //Automatic Summary
  previousReport = "";//Depuis votre précédent rapport : //Since your previous report:
  resumeToSee: { info: string;}[] = [];
  resume = [
    {
      info:"-12 % de crises par rapport à la période précédente",
    },
    {
      info:"Observance du traitement stable et excellente",
    },
    {
      info:"Récupération moyenne après crise améliorée",
    },
    {
      info:"Crises majoritairement liées au stress",
    },
    {
      info:"Sommeil insufisant avant 63 % des crises",
    }
  ];

  resumeEn = [
    {
      info:"-12% decrease in incidents compared to the previous period",
    },
    {
      info:"Stable and excellent treatment adherence",
    },
    {
      info:"Improved average recovery following a crisis",
    },
    {
      info:"Crises primarily related to stress",
    },
    {
      info:"Insufficient sleep prior to 63% of the attacks",
    }
  ];

  constructor(
            public translate: TranslateappService,
            private elementRef: ElementRef,
  ){}

  ngOnInit(): void {
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
          'pages.reports.resume.automaticSummary',
          'pages.reports.resume.previousReport',
          'seeEverything'
        ]
      )
      .subscribe(translations => {
        this.automaticSummary = translations['pages.reports.resume.automaticSummary'];
        this.previousReport = translations['pages.reports.resume.previousReport'];
      });
    }
    
    if(this.translate.getLanguageUsed() == "fr"){
      this.resumeToSee = this.resume;
    }
    else{
      this.resumeToSee = this.resumeEn;
    }
  }
}
