import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { TranslateappService } from '../../../services/translateapp.service';
import { LocalstorageService } from '../../../services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patternbuilder',
  standalone: false,
  templateUrl: './patternbuilder.component.html',
  styleUrl: './patternbuilder.component.scss'
})

export class PatternbuilderComponent implements OnInit{
  title = "";
  subTitle = "";
  explaination = "";
  start = false;
  score = 0;

  colors = ['red', 'yellow', 'green', 'blue'];

  pattern: string[] = [];
  playerInput: string[] = [];

  level = 1;
  activePad: string | null = null;
  isPlaying = false;
  message = '';
  levelText = '';
  turn = '';
  watch = '';
  success = '';
  wrong = "";

  numbertimesplayed = 0;
  showEnd = false;
  joinus = "";
  endgaming = "";
  finalText = "";
  okText = "OK";
  bestScore = 0;
  bestScoreText = "";

  @ViewChild('game') gameElement!: ElementRef;

  source = "patternbuilder";

  constructor(public appComponent: AppComponent,
              public translate: TranslateappService,
              private elementRef: ElementRef,
              private router : Router,
              public localStorageService: LocalstorageService
  ){}

  ngOnInit() {
    window.scroll(0,0);
    this.appComponent.setHome(false);
    this.translate.comp$.subscribe(
      () => {
          this.changeLanguage();
      }
    );
    this.changeLanguage();

    this.setSourcePage();
    
    this.pattern = [];
    this.level = 1;

    this.checkLocaleStorage();
    if(this.numbertimesplayed == 3){
      this.finalText = this.bestScoreText + " Score : " + this.localStorageService.getBestScoreExercicePlayed("patternbuilderscore");
      this.showEnd = true;
    }
  }

  setSourcePage(){
    this.localStorageService.setSourcePage(this.source);
  }

  checkLocaleStorage(){
    let times = this.localStorageService.getNumberExercicePlayed("patternbuilder");
    if(times != null){
        this.numbertimesplayed = Number(times);
    }
  }

  checkBestScore(){
    let score = this.localStorageService.getBestScoreExercicePlayed("patternbuilderscore");
    if(score == null || score == undefined){
      this.localStorageService.setBestScoreExercicePlayed("patternbuilderscore",this.bestScore);
    }
    else if(score != null || score != undefined){
      if( this.bestScore > Number(score)){
         this.localStorageService.setBestScoreExercicePlayed("patternbuilderscore",this.bestScore);
      }  
    }
  }

  changeLanguage(){
    //changeLanguage when page is on front
    if(this.elementRef.nativeElement.offsetParent != null) {
      this.translate.translate.get(
        [
          'pages.exercices.games.5.title',
          'pages.exercices.games.5.subtitle',
          'pages.exercices.games.5.explanations',
          'pages.exercices.games.5.message',
          'pages.exercices.games.5.message2',
          'pages.exercices.games.5.message3',
          'pages.exercices.games.5.messageSuccess',
          'pages.exercices.games.5.messageWrong',
          'join',
          'endgaming',
          'highest'
        ]
      )
      .subscribe(translations => {
        this.title = translations['pages.exercices.games.5.title'];
        this.subTitle = translations['pages.exercices.games.5.subtitle'];
        this.explaination = translations['pages.exercices.games.5.explanations'];
        this.levelText = translations['pages.exercices.games.5.message'];
        this.turn = translations['pages.exercices.games.5.message2'];
        this.watch = translations['pages.exercices.games.5.message3'];
        this.success = translations['pages.exercices.games.5.messageSuccess'];
        this.wrong = translations['pages.exercices.games.5.messageWrong'];
        this.joinus = translations['join'];
        this.endgaming = translations['endgaming'];
        this.bestScoreText = translations['highest'];
      });
    }
  }

  addButtonClass(name:string){
    if(!this.start){
      return name;
    }
    else{
      return name+' grey';
    }
  }

  startGame() {
    this.checkLocaleStorage();
    if(this.numbertimesplayed == 3){
      this.finalText = this.bestScoreText + " Score : " + this.localStorageService.getBestScoreExercicePlayed("patternbuilderscore");
      this.showEnd = true;
    }
    else{
      this.start = true;
      this.score = 0;
      this.nextRound();
    }
  }

  scrollToGameElement(){
    if (this.gameElement != null) {
      let el = this.gameElement.nativeElement as HTMLElement
      el.scrollIntoView();
    }
  }

  nextRound() {
    this.scrollToGameElement();
    this.playerInput = [];
    this.isPlaying = false;
    this.message = this.watch;

    const random = this.colors[Math.floor(Math.random() * 4)];
    this.pattern.push(random);
    setTimeout(() => {
        this.playSequence();
      }, 1500);
  }

  async playSequence() {
    for (let color of this.pattern) {
      await this.flash(color);
    }

    this.isPlaying = true;
    this.message = this.turn;
  }

  flash(color: string): Promise<void> {
    return new Promise(resolve => {

      this.activePad = color;

      //this.playSound(color);

      setTimeout(() => {
        this.activePad = null;
        setTimeout(resolve, 150);
      }, 400);

    });
  }

  playSound(color: string) {
    const sounds: any = {
      red: new Audio('assets/sounds/red.wav'),
      yellow: new Audio('assets/sounds/yellow.wav'),
      green: new Audio('assets/sounds/green.wav'),
      blue: new Audio('assets/sounds/blue.wav')
    };

    sounds[color].play();
  }

  handleClick(color: string) {

    if (!this.isPlaying) return;

    this.playerInput.push(color);

    this.flash(color);

    const index = this.playerInput.length - 1;

    if (this.playerInput[index] !== this.pattern[index]) {
      this.setTimesPlayed();
      this.gameOver();
      return;
    }

    if (this.playerInput.length === this.pattern.length) {
      this.score++;
      this.level++;
      this.message = this.success;

      setTimeout(() => {
        this.nextRound();
      }, 1000);
    }
  }

  getTimesPlayed(){
    return this.numbertimesplayed;
  }

  checkUserCanPlay():boolean{
    let timesplayed = this.getTimesPlayed();
    if(timesplayed <= 3){
        return true;
    }
    else{
      return false;
    }
  }

   setTimesPlayed(){
    this.numbertimesplayed++;
    this.localStorageService.setNumberExercicePlayed("patternbuilder", this.numbertimesplayed);
  }

  gameOver() {
    this.setOrNotSetBestScore();
    if(!this.checkUserCanPlay()){
      this.finalText = this.bestScoreText + " Score : " + this.localStorageService.getBestScoreExercicePlayed("patternbuilderscore");
      this.showEnd = true;
    }
    this.message = this.wrong;
    this.isPlaying = false;
    this.start = false;
    this.level = 1;
    this.pattern = [];
    navigator.vibrate(200);
  }

  setOrNotSetBestScore(){
    if(this.score >= this.bestScore){
        this.bestScore = this.score;
        this.checkBestScore();
    }
  }

  join(){
    this.showEnd = false;
    this.appComponent.scrollToFooterElement();
  }

  close(){
    this.showEnd =false;
  }

  quit(){
    this.router.navigate(["exercices"]);
  }
}
