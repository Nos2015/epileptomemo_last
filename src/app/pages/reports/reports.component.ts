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
  titlePage = "";
  subtitle = "";
  first = "";
  second = "";
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
          'pages.title',
          'pages.reports.title',
          'pages.reports.first',
          'pages.reports.second',
          'pages.reports.subtitle',
          'pages.reports.conclusion'
        ]
      )
      .subscribe(translations => {
        this.comingSoon = translations['comingSoon'];
        this.titlePage = translations['pages.title'];
        this.title = translations['pages.reports.title'];
        this.first = translations['pages.reports.first'];
        this.second = translations['pages.reports.second'];
        this.subtitle = translations['pages.reports.subtitle'];
        this.conclusion = translations['pages.reports.conclusion'];
      });
    }
  }
  
}
