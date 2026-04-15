import { Component, ElementRef, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Router } from '@angular/router';
import { TranslateappService } from '../../services/translateapp.service';

@Component({
  selector: 'app-exercices',
  standalone: false,
  templateUrl: './exercices.component.html',
  styleUrl: './exercices.component.scss'
})

export class ExercicesComponent implements OnInit{

  exercicesTitle = "";
  exercicesSubTitle = "";
  exercicesOtherExercices = "";

  firstGameTitle = "";
  firstGameSubTitle = "";

  secondGameTitle = "";
  secondGameSubTitle = "";

  thirdGameTitle = "";
  thirdGameSubTitle = "";

  fourthGameTitle = "";
  fourthGameSubTitle = "";

  fiveGameTitle = "";
  fiveGameSubTitle = "";

  sixGameTitle = "";
  sixGameSubTitle = "";

  sevenGameTitle = "";
  sevenGameSubTitle = "";

  levelEasy = "";
  levelMedium = "";
  levelHard = "";

  constructor(public appComponent: AppComponent,
              private router : Router,
              public translate: TranslateappService,
              private elementRef: ElementRef,
  ){}

  ngOnInit(): void {
    window.scroll(0,0);
    this.appComponent.setHome(true);
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
          'pages.exercices.title',
          'pages.exercices.subtitle',
          'pages.exercices.other',
          'pages.exercices.games.1.title',
          'pages.exercices.games.1.subtitle',
          'pages.exercices.games.2.title',
          'pages.exercices.games.2.subtitle',
          'pages.exercices.games.3.title',
          'pages.exercices.games.3.subtitle',
          'pages.exercices.games.4.title',
          'pages.exercices.games.4.subtitle',
          'pages.exercices.games.5.title',
          'pages.exercices.games.5.subtitle',
          'pages.exercices.games.6.title',
          'pages.exercices.games.6.subtitle',
          'pages.exercices.games.7.title',
          'pages.exercices.games.7.subtitle',
        ]
      )
      .subscribe(translations => {
        this.exercicesTitle = translations['pages.exercices.title'];
        this.exercicesSubTitle = translations['pages.exercices.subtitle'];
        this.exercicesOtherExercices = translations['pages.exercices.other'];
        this.firstGameTitle = translations['pages.exercices.games.1.title'];
        this.firstGameSubTitle = translations['pages.exercices.games.1.subtitle'];
        this.secondGameTitle = translations['pages.exercices.games.2.title'];
        this.secondGameSubTitle = translations['pages.exercices.games.2.subtitle'];
        this.thirdGameTitle = translations['pages.exercices.games.3.title'];
        this.thirdGameSubTitle = translations['pages.exercices.games.3.subtitle'];
        this.fourthGameTitle = translations['pages.exercices.games.4.title'];
        this.fourthGameSubTitle = translations['pages.exercices.games.4.subtitle'];
        this.fiveGameTitle = translations['pages.exercices.games.5.title'];
        this.fiveGameSubTitle = translations['pages.exercices.games.5.subtitle'];
        this.sixGameTitle = translations['pages.exercices.games.6.title'];
        this.sixGameSubTitle = translations['pages.exercices.games.6.subtitle'];
        this.sevenGameTitle = translations['pages.exercices.games.7.title'];
        this.sevenGameSubTitle = translations['pages.exercices.games.7.subtitle'];
      });
    }
  }

  goTo(route:string){
    this.router.navigate([route]);
  }

}
