import { Component, ElementRef, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { TranslateappService } from '../../services/translateapp.service';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-journal',
  standalone: false,
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.scss'
})
export class JournalComponent implements OnInit{

  comingSoon = "";
  title = "";
  titlePage = "";
  first = "";
  second = "";
  third = "";
  fourth = "";
  five = "";
  conclusion = "";
  source = "journal";

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
          'pages.journal.title',
          'pages.journal.first',
          'pages.journal.second',
          'pages.journal.third',
          'pages.journal.fourth',
          'pages.journal.five',
          'pages.journal.conclusion'
        ]
      )
      .subscribe(translations => {
        this.comingSoon = translations['comingSoon'];
        this.titlePage = translations['pages.title'];
        this.title = translations['pages.journal.title'];
        this.first = translations['pages.journal.first'];
        this.second = translations['pages.journal.second'];
        this.third = translations['pages.journal.third'];
        this.fourth = translations['pages.journal.fourth'];
        this.five = translations['pages.journal.five'];
         this.conclusion = translations['pages.journal.conclusion'];
      });

    }
  }

}
