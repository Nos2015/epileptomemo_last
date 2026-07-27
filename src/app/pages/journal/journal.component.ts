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
  subtitlePage ="";
  newCrisis = "";
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
          'pages.journal.subtitle',
          'pages.journal.addNewCrisis'
        ]
      )
      .subscribe(translations => {
        this.comingSoon = translations['comingSoon'];
        this.title = translations['pages.title'];
        this.titlePage = translations['pages.journal.title'];
        this.subtitlePage = translations['pages.journal.subtitle'];
        this.newCrisis = translations['pages.journal.addNewCrisis'];
      });

    }
  }

}
