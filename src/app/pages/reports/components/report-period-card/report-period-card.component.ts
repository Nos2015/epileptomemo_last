import { Component, ElementRef, OnInit } from '@angular/core';
import { TranslateappService } from '../../../../services/translateapp.service';
import { LocalstorageService } from '../../../../services/localstorage.service';

@Component({
  selector: 'app-report-period-card',
  standalone: false,
  templateUrl: './report-period-card.component.html',
  styleUrl: './report-period-card.component.scss'
})
export class ReportPeriodCardComponent implements OnInit{
  periodOverview= "";
  period = " :";
  lastMonth= "";
  recordedSeizures = "";
  compliance ="";
  cognitiveExercicesCompleted ="";

  constructor(
              public translate: TranslateappService,
              private elementRef: ElementRef,
              public localStorage: LocalstorageService
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
          'pages.reports.period.periodOverview',
          'pages.reports.period.period',
          'pages.reports.period.lastMonth',
          'pages.reports.period.recordedSeizures',
          'pages.reports.period.compliance',
          'pages.reports.period.cognitiveExercicesCompleted'
        ]
      )
      .subscribe(translations => {
        this.periodOverview = translations['pages.reports.period.periodOverview'];
        this.period = translations['pages.reports.period.period'];
        this.lastMonth = translations['pages.reports.period.lastMonth'];
        this.recordedSeizures = translations['pages.reports.period.recordedSeizures'];
        this.compliance = translations['pages.reports.period.compliance'];
        this.cognitiveExercicesCompleted = translations['pages.reports.period.cognitiveExercicesCompleted'];
      });
    }
  }
}
