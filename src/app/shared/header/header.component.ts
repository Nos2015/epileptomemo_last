import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { TranslateappService } from '../../services/translateapp.service';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  @Input()sidebarActive = false;
  @Output()toggleSidebar = new EventEmitter();

  exercices = "";
  journal = "";
  reports = "";
  stats = "";
  family = "";
  join = "";
  isChecked = false;

  titleMobile = "";
  titleMobileExercices = "";
  titleMobileJournal = "";
  titleMobileStatistics = "";
  titleMobileReports = "";
  titleMobileFamily = "";

  constructor(
      private router : Router,
      public appComponent: AppComponent,
      public translate: TranslateappService,
      private elementRef: ElementRef,
  ){

  }

  ngOnInit(): void {
    this.translate.comp$.subscribe(
      () => {
        this.changeLanguage();
        this.manageLanguage();
          
      }
    );
    this.changeLanguage();
    this.manageLanguage();
    this.setTitleHeader();
  }
  
  setTitleHeader(){
    if (this.router.url === '/'){
      this.titleMobile = "EpileptoMemo";
    }
    else if (this.router.url === '/exercices'){
      this.titleMobile = this.titleMobileExercices;
    }
    else if (this.router.url === '/stats'){
      this.titleMobile = this.titleMobileStatistics;
    }
    else if (this.router.url === '/family'){
      this.titleMobile = this.titleMobileFamily;
    }
    else if (this.router.url === '/reports'){
      this.titleMobile = this.titleMobileReports;
    }
    else if (this.router.url === '/journal'){
      this.titleMobile = this.titleMobileJournal;
    }
  }

  changeLanguage(){
    //changeLanguage when page is on front
    if(this.elementRef.nativeElement.offsetParent != null) {
      this.translate.translate.get(
        [
          'exercices',
          'journal',
          'reports',
          'stats',
          'family',
          'join',
          'pages.exercices.titleMobile',
          'pages.family.titleMobile',
          'pages.statistics.titleMobile',
          'pages.reports.titleMobile',
          'pages.journal.titleMobile',
        ]
      )
      .subscribe(translations => {
        this.exercices = translations['exercices'];
        this.journal = translations['journal'];
        this.reports = translations['reports'];
        this.stats = translations['stats'];
        this.family = translations['family'];
        this.join = translations['join'];
        this.titleMobileFamily = translations['pages.family.titleMobile'];
        this.titleMobileExercices = translations['pages.exercices.titleMobile'];
        this.titleMobileJournal = translations['pages.journal.titleMobile'];
        this.titleMobileReports = translations['pages.reports.titleMobile'];
        this.titleMobileStatistics = translations['pages.statistics.titleMobile'];
        this.setTitleHeader();
      });
    }
  }

  manageLanguage(){
    if(this.translate.getLanguageUsed() == "" || this.translate.getLanguageUsed()=="en"){
      this.isChecked = true;
    }
    else{
      this.isChecked = false;
    }
  }

  goTo(route:string){
    if(route === "footerComponent"){
      this.appComponent.scrollToFooterElement();
    }
    else{
      if(route == "exercices"){
        this.appComponent.setHome(true);
      }
      this.router.navigate([route]);
    }
  }

  setLanguage(event:Event){
    const isChecked = (event.target as HTMLInputElement).checked;
    if(isChecked){
      localStorage.setItem("language", "en");
      this.translate.setTransLanguage("en");
    }
    else{
      localStorage.setItem("language", "fr");
      this.translate.setTransLanguage("fr");
    }
    this.changeLanguage();
  }
}
