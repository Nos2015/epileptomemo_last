import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateappService } from '../../../services/translateapp.service';

@Component({
  selector: 'app-treatment-card',
  standalone: false,
  templateUrl: './treatment-card.component.html',
  styleUrl: './treatment-card.component.scss'
})
export class TreatmentCardComponent implements OnInit{
  actualTreamentTitle="";
  nameFirstTreatment="";
  firtTreatmentDoseDescription="";
  compliance="";
  seeEverything = "";

   constructor(
              private router: Router,
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
          'seeEverything',
          'pages.journal.dashboard.actual-treatment.actualTreamentTitle',
          'pages.journal.dashboard.actual-treatment..nameFirstTreatment',
          'pages.journal.dashboard.actual-treatment.firtTreatmentDoseDescription',
          'pages.journal.dashboard.actual-treatment.compliance'
        ]
      )
      .subscribe(translations => {
        this.seeEverything = translations['seeEverything'];
        this.actualTreamentTitle = translations['pages.journal.dashboard.actual-treatment.actualTreamentTitle'];
        this.nameFirstTreatment = translations['pages.journal.dashboard.actual-treatment.nameFirstTreatment'];
        this.firtTreatmentDoseDescription = translations['pages.journal.dashboard.actual-treatment.firtTreatmentDoseDescription'];
        this.compliance = translations['pages.journal.dashboard.actual-treatment.compliance'];
      });

    }
  }
} 
