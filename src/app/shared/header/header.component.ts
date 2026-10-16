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

  login = "";
  createAccount = "";
  isChecked = false;

  titleMobile = "";

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
    else if (this.router.url === '/login'){
      this.titleMobile = this.login;
    }
    else if (this.router.url === '/createAccount'){
      this.titleMobile = this.createAccount;
    }
  }

  changeLanguage(){
    //changeLanguage when page is on front
    if(this.elementRef.nativeElement.offsetParent != null) {
      this.translate.translate.get(
        [
          'login',
          'createAccount',
        ]
      )
      .subscribe(translations => {
        this.login = translations['login'];
        this.createAccount = translations['createAccount'];
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
