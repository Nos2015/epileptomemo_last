import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  }

  changeLanguage(){
    console.log("changeLanguage");
    //changeLanguage when page is on front
    if(this.elementRef.nativeElement.offsetParent != null) {
      this.translate.translate.get(
        [
          'exercices',
          'journal',
          'reports',
          'stats',
          'family',
          'join'
        ]
      )
      .subscribe(translations => {
        this.exercices = translations['exercices'];
        this.journal = translations['journal'];
        this.reports = translations['reports'];
        this.stats = translations['stats'];
        this.family = translations['family'];
        this.join = translations['join'];
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
    console.log("isChecked = "+isChecked);
    if(isChecked){
      console.log("isChecked true");
      localStorage.setItem("language", "en");
      this.translate.setTransLanguage("en");
    }
    else{
      console.log("isChecked not true");
      localStorage.setItem("language", "fr");
      this.translate.setTransLanguage("fr");
    }
    this.changeLanguage();
  }
}
