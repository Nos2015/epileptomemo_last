import { Component, ElementRef, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { TranslateappService } from '../../services/translateapp.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-reports',
  standalone: false,
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.scss'
})
export class ReportsComponent implements OnInit{

  comingSoon = "";
  title = "";
  subtitle = "";
  generatePDF = "";

  recoredSeizures = "";
  previous12mMonths = "";
  observance = "";
  excellente = "";
  realizedExercices = "";
  averageSleep = "";
  conclusion = "";
  source = "reports"

  constructor(public appComponent: AppComponent,
              public translate: TranslateappService,
              private elementRef: ElementRef,
              public localStorage: LocalstorageService
  ){}

  ngOnInit(): void {
    this.appComponent.setHome(false);
    this.translate.comp$.subscribe(
      () => {
          this.changeLanguage();
      }
    );
    this.changeLanguage();
    this.setSourcePage();
  }

  setSourcePage(){
    this.localStorage.setSourcePage(this.source);
  }

  ngAfterViewInit(){
    this.appComponent.changeTitleMobileHeader();
  }

  changeLanguage(){
    //changeLanguage when page is on front
    if(this.elementRef.nativeElement.offsetParent != null) {
      this.translate.translate.get(
        [
          'comingSoon',
          'pages.reports.title',
          'pages.reports.subtitle',
          'pages.reports.generatePDF',
          'pages.reports.recoredSeizures',
          'pages.reports.previous12mMonths',
          'pages.reports.conclusion',
          'pages.reports.observance',
          'pages.reports.excellente',
          'pages.reports.realizedExercices',
          'pages.reports.averageSleep'
        ]
      )
      .subscribe(translations => {
        this.comingSoon = translations['comingSoon'];
        this.title = translations['pages.reports.title'];
        this.subtitle = translations['pages.reports.subtitle'];
        this.generatePDF = translations['pages.reports.generatePDF'];
        this.recoredSeizures = translations['pages.reports.recoredSeizures'];
        this.previous12mMonths = translations['pages.reports.previous12mMonths'];
        this.observance = translations['pages.reports.observance'];
        this.excellente = translations['pages.reports.excellente'];
        this.conclusion = translations['pages.reports.conclusion'];
        this.realizedExercices = translations['pages.reports.realizedExercices'],
        this.averageSleep = translations['pages.reports.averageSleep'];
      });
    }
  }
  
}
