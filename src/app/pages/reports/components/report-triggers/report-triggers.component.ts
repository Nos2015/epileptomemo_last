import { Component, ElementRef, OnInit } from '@angular/core';
import { TranslateappService } from '../../../../services/translateapp.service';

@Component({
  selector: 'app-report-triggers',
  standalone: false,
  templateUrl: './report-triggers.component.html',
  styleUrl: './report-triggers.component.scss'
})
export class ReportTriggersComponent implements OnInit {
  mainTriggers ="";
  stress = "";
  fatigue = "";
  lackOfSleep = "";
  missedTreatment = "";

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
          'pages.reports.triggers.mainTriggers',
          'pages.reports.triggers.stress',
          'pages.reports.triggers.fatigue',
          'pages.reports.triggers.lackOfSleep',
          'pages.reports.triggers.missedTreatment'
        ]
      )
      .subscribe(translations => {
        this.mainTriggers = translations['pages.reports.triggers.mainTriggers'];
        this.stress = translations['pages.reports.triggers.stress'];
        this.fatigue = translations['pages.reports.triggers.fatigue'];
        this.lackOfSleep = translations['pages.reports.triggers.lackOfSleep'];
        this.missedTreatment = translations['pages.reports.triggers.missedTreatment'];
      });
    }
  }
}
