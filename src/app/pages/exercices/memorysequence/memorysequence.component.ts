import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { TranslateappService } from '../../../services/translateapp.service';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../services/localstorage.service';

@Component({
  selector: 'app-memorysequence',
  standalone: false,
  templateUrl: './memorysequence.component.html',
  styleUrl: './memorysequence.component.scss'
})

export class MemorysequenceComponent implements OnInit{

  title = "";
  subTitle = "";
  explaination = "";

  level = 3;
  playing = false;
  message = "";
  score = 0;

  start = false;

  numbertimesplayed = 0;
  showEnd = false;
  joinus = "";
  endgaming = "";
  finalText = "";
  okText = "OK";
  bestScore = 0;
  bestScoreText = "";

  source = "memorysequence";

  @ViewChild('game') gameElement!: ElementRef;

  constructor(public appComponent: AppComponent,
              public translate: TranslateappService,
              private elementRef: ElementRef,
              private router : Router,
              public localStorageService: LocalstorageService
  ){}

  ngOnInit(): void {
    console.log("MemorysequenceComponent ngOnInit");
    window.scroll(0,0);
    this.appComponent.setHome(false);
    this.translate.comp$.subscribe(
      () => {
          this.changeLanguage();
      }
    );
    this.changeLanguage();

    this.setSourcePage();
    
    this.checkLocaleStorage();
  }

  setSourcePage(){
    this.localStorageService.setSourcePage(this.source);
  }

  checkLocaleStorage(){
    console.log("MemorysequenceComponent checkLocaleStorage");
    let times = this.localStorageService.getNumberExercicePlayed("memorysequence");
    if(times != null){
        this.numbertimesplayed = Number(times);
    }
    console.log("MemorysequenceComponent checkLocaleStorage numbertimesplayed : " + this.numbertimesplayed);
    if(this.numbertimesplayed == 3){
      console.log("MemorysequenceComponent ngOnInit numbertimesplayed == 3");
      this.appComponent.setStartGame(false);
      this.start = this.appComponent.startGame;
      this.finalText = this.bestScoreText + " Score : " + this.localStorageService.getBestScoreExercicePlayed("memorysequencescore");
      this.showEnd = true;
    }
  }

  checkBestScore(){
    let score = this.localStorageService.getBestScoreExercicePlayed("memorysequencescore");
    if(score == null || score == undefined){
      this.localStorageService.setBestScoreExercicePlayed("memorysequencescore",this.bestScore);
    }
    else if(score != null || score != undefined){
      if( this.bestScore > Number(score)){
         this.localStorageService.setBestScoreExercicePlayed("memorysequencescore",this.bestScore);
      }  
    }
  }

  changeLanguage(){
    //changeLanguage when page is on front
    if(this.elementRef.nativeElement.offsetParent != null) {
      this.translate.translate.get(
        [
          'pages.exercices.games.1.title',
          'pages.exercices.games.1.subtitle',
          'pages.exercices.games.1.explanations',
          'pages.exercices.games.1.messageWrong',
          'pages.exercices.games.1.messageSuccess',
          'join',
          'endgaming',
          'highest'
        ]
      )
      .subscribe(translations => {
        this.title = translations['pages.exercices.games.1.title'];
        this.subTitle = translations['pages.exercices.games.1.subtitle'];
        this.explaination = translations['pages.exercices.games.1.explanations'];
        this.joinus = translations['join'];
        this.endgaming = translations['endgaming'];
        this.bestScoreText = translations['highest'];
      });
    }
  }

  addButtonClass(type:string){
    let css = 'button-width50';
    if(type == 'buttons'){
      css += ' nobackground';
    }

    if(!this.start){
      return css;
    }
    else{
      css += ' grey';
      return css;
    }
    
  }

  startGame(){
    this.checkLocaleStorage();
    if(this.numbertimesplayed != 3){
      this.appComponent.setStartGame(true);
      this.start = this.appComponent.startGame;
    }
  }

  join(){
    console.log("MemorysequenceComponent join");
    this.start = this.appComponent.startGame;
    this.showEnd = false;
    setTimeout(() => this.appComponent.scrollToFooterElement(), 1000);
  }

  quit(){
    this.router.navigate(["exercices"]);
  }

  changeHide(val: boolean) {
    this.start = val;
  }
}