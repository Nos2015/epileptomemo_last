import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';
import { TranslateappService } from '../../services/translateapp.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit{
  @Output()toggleSidebar: EventEmitter<boolean> = new EventEmitter<boolean>();

  memoryExercices = "";
  simpleCognitiveGames = "";
  seizureJournal = "";
  logSeizureEasily = "";
  neurologistReports = "";
  exportHealthData ="";
  statistics = "";
  medicalCare = "";
  familySupport = "";
  keepLoveOneInformed = "";
  joinWaitList = "";
  joinFirst = "";
  isChecked = false;

  constructor( private router : Router,
              public appComponent: AppComponent,
              public translate: TranslateappService,
              private elementRef: ElementRef,
  ){
  }

  ngOnInit(): void {
    this.translate.comp$.subscribe(
      () => {
          this.initElementMenu();
          this.changeLanguage();
          this.manageLanguage();
      }
    );
    this.initElementMenu();
    this.changeLanguage();
    this.manageLanguage();
  }

  initElementMenu(){
    document.querySelectorAll('.elementMenu').forEach(el => {
        el.classList.remove('hovered');
        (el as HTMLElement).style.background = '';
    });
  }

  changeLanguage(){
    //changeLanguage when page is on front
    this.translate.translate.get(
        [
          'memoryExercices',
          'simpleCognitiveGames',
          'seizureJournal',
          'logSeizureEasily',
          'neurologistReports',
          'exportHealthData',
          'statistics',
          'medicalCare',
          'familySupport',
          'keepLoveOneInformed',
          'joinWaitList',
          'joinFirst'
        ]
      )
      .subscribe(translations => {
        this.memoryExercices = translations['memoryExercices'];
        this.simpleCognitiveGames = translations['simpleCognitiveGames'];
        this.seizureJournal = translations['seizureJournal'];
        this.logSeizureEasily = translations['logSeizureEasily'];
        this.neurologistReports = translations['neurologistReports'];
        this.exportHealthData = translations['exportHealthData'];
        this.statistics = translations['statistics'];
        this.medicalCare = translations['medicalCare'];
        this.familySupport = translations['familySupport'];
        this.keepLoveOneInformed = translations['keepLoveOneInformed'];
        this.joinWaitList = translations['joinWaitList'];
        this.joinFirst = translations['joinFirst'];
      });
  }

  manageLanguage(){
    if(this.translate.getLanguageUsed() == "" || this.translate.getLanguageUsed()=="en"){
      this.isChecked = true;
    }
    else{
      this.isChecked = false;
    }
  }

  goTo(route: string): void{
    if(route === "footerComponent"){
      this.appComponent.scrollToFooterElement();
    }
    else{
      window.scroll(0,0);
      this.router.navigate([route]);
    }
    this.toggleSidebar.emit(false);
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

  onTouchStart(event: TouchEvent) {
    (event.currentTarget as HTMLElement).classList.add('hovered');
  }

  onTouchEnd(event: TouchEvent) {
      setTimeout(() => {
          (event.currentTarget as HTMLElement).classList.remove('hovered');
      }, 2000);
  }
}
