import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateappService } from '../../services/translateapp.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  standalone: false
})
export class DashboardComponent implements OnInit{
  
  totalCrisis = "";
  thisWeek = "";
  thisMonth = "";
  month = "";
  averageDuration = "";
  averageDurationThisMonth = "";
  treatment = "";
  treatmentMessage = "";

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
          'pages.journal.dashboard.totalCrisis',
          'pages.journal.dashboard.subtitleTotalCrisis',
          'pages.journal.dashboard.thisMonth',
          'pages.journal.dashboard.subtileThisMonth',
          'pages.journal.dashboard.averageDuration',
          'pages.journal.dashboard.subtitleAverageDuration',
          'pages.journal.dashboard.treatment',
          'pages.journal.dashboard.subtitleTreatment',
        ]
      )
      .subscribe(translations => {
        this.totalCrisis = translations['pages.journal.dashboard.totalCrisis'];
        this.thisWeek = "+2 "+translations['pages.journal.dashboard.subtitleTotalCrisis'];
        this.thisMonth = translations['pages.journal.dashboard.thisMonth'];
        this.month = translations['pages.journal.dashboard.subtileThisMonth']+ " 2026";
        this.averageDuration = translations['pages.journal.dashboard.averageDuration'];
        this.averageDurationThisMonth = "-12% "+ translations['pages.journal.dashboard.subtitleAverageDuration'];
        this.treatment = translations['pages.journal.dashboard.treatment'];
        this.treatmentMessage = translations['pages.journal.dashboard.subtitleTreatment'];
      });

    }
  }


}
