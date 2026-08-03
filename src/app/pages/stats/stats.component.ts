import { Component, ElementRef, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { TranslateappService } from '../../services/translateapp.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-stats',
  standalone: false,
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit{
  
  comingSoon = "";
  title = "";
  titlePage = "";
  first = "";
  second = "";
  third = "";
  fourth = "";
  five = "";
  source = "stats"

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
          'pages.statistics.title',
          'pages.statistics.functions',
          'pages.statistics.first',
          'pages.statistics.second',
          'pages.statistics.third',
          'pages.statistics.fourth',
          'pages.statistics.five',
        ]
      )
      .subscribe(translations => {
        this.comingSoon = translations['comingSoon'];
        this.titlePage = translations['pages.statistics.functions'];
        this.title = translations['pages.statistics.title'];
        this.first = translations['pages.statistics.first'];
        this.second = translations['pages.statistics.second'];
        this.third = translations['pages.statistics.third'];
        this.fourth = translations['pages.statistics.fourth'];
        this.five = translations['pages.statistics.five'];
      });
    }
  }

}
