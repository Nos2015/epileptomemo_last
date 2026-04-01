import { Component, ElementRef, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { TranslateappService } from '../../services/translateapp.service';

@Component({
  selector: 'app-family',
  standalone: false,
  templateUrl: './family.component.html',
  styleUrl: './family.component.scss'
})
export class FamilyComponent implements OnInit{

  comingSoon = "";
  title = "";
  titlePage = "";
  subtitle = "";
  first = "";
  second = "";
  conclusion = "";

  constructor(public appComponent: AppComponent,
              public translate: TranslateappService,
              private elementRef: ElementRef,
  ){}

  ngOnInit(): void {
    this.appComponent.setHome(false);
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
          'comingSoon',
          'pages.title',
          'pages.family.title',
          'pages.family.first',
          'pages.family.second',
          'pages.family.subtitle',
          'pages.family.conclusion'
        ]
      )
      .subscribe(translations => {
        this.comingSoon = translations['comingSoon'];
        this.titlePage = translations['pages.title'];
        this.title = translations['pages.family.title'];
        this.first = translations['pages.family.first'];
        this.second = translations['pages.family.second'];
        this.subtitle = translations['pages.family.subtitle'];
        this.conclusion = translations['pages.family.conclusion'];
      });
    }
  }

}
