import { Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { TranslateappService } from '../../../services/translateapp.service';
import { SoundserviceService } from '../../../services/soundservice.service';
import { LocalstorageService } from '../../../services/localstorage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nbacktraining',
  standalone: false,
  templateUrl: './nbacktraining.component.html',
  styleUrl: './nbacktraining.component.scss'
})
export class NbacktrainingComponent implements OnInit{
  title = "";
  subTitle = "";
  explaination = "";
  grid = Array(9).fill(0);
  activeIndex = -1;

  history: number[] = [];

  n = 1;
  step = 0;
  totalSteps = 10;

  progress = 0;
  score = 0;

  lives = 3;

  start = false;
  win = false;

  message = '';
  message1 = '';
  message2 = '';
  message3 = '';
  messageSuccess = '';
  messageError = '';
  messageEnd = '';

  match = '';
  nomatch = '';

  nbackcolors = false;
  nbackletters = false;
  
  color ='';
  letters ='';
  typeLevel ='';

  currentLetter = '';
  previousLetter = '';

  lettersArray = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  showTile = false;
  showScore = false;

  levelsElement = viewChild<ElementRef<HTMLElement>>('insertremovelevel');

  @ViewChild('game') gameElement!: ElementRef;

  numbertimesplayedColor = 0;
  numbertimesplayedLetter = 0;
  showEnd = false;
  notShowEndColor = true;
  notShowEndLetters = true;
  joinus = "";
  endgaming = "";
  finalText = "";
  okText = "OK";
  bestScoreColor = 0;
  bestScoreLetter = 0;
  bestScoreText = "";
  messageNotColor = "";
  messageNotLetters = "";

  source = "nbacktraining";

   constructor(public appComponent: AppComponent,
              public translate: TranslateappService,
              private elementRef: ElementRef,
              private sound: SoundserviceService,
              private router : Router,
              public localStorageService: LocalstorageService
  ){}

  ngOnInit(): void {
    window.scroll(0,0);
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
    this.localStorageService.setSourcePage(this.source);
  }

  checkLocaStorage(){
    this.checkLocaleStorageColor();
    this.checkLocaleStorageLetter();
    let scoreColor = this.localStorageService.getBestScoreExercicePlayed("nbacktrainingscorecolor");
    let scoreLetters = this.localStorageService.getBestScoreExercicePlayed("nbacktrainingscoreletters");
    if (scoreColor == undefined || scoreColor == null){
      scoreColor = "0";
    }
     if (scoreLetters == undefined || scoreLetters == null){
      scoreLetters = "0";
    }
    if(this.numbertimesplayedColor == 3 && this.numbertimesplayedLetter == 3){
      this.typeLevel = '';
      this.finalText = this.bestScoreText + " Score "+ this.color + " : " + scoreColor + "<br/>" + this.bestScoreText + " Score "+ this.letters + " : " + scoreLetters;
      this.showEnd = true;
      this.notShowEndColor = false;
      this.notShowEndLetters = false;
    }
    else if(this.numbertimesplayedColor == 3 && this.numbertimesplayedLetter != 3){
      this.typeLevel = '';
      this.finalText = this.bestScoreText + " Score "+ this.color + " : " + scoreColor + "<br/>" + this.bestScoreText + " Score "+ this.letters + " : " + scoreLetters;
      this.finalText += "<br/><br/>"+this.messageNotLetters;
      this.showEnd = true;
      this.notShowEndColor = false;
      this.notShowEndLetters = true;
    }
    else if (this.numbertimesplayedColor != 3 && this.numbertimesplayedLetter == 3){
      this.typeLevel = '';
      this.finalText = this.bestScoreText + " Score "+ this.color + " : " + scoreColor + "<br/>" + this.bestScoreText + " Score "+ this.letters + " : " + scoreLetters;
      this.finalText += "<br/><br/>"+this.messageNotColor;
      this.showEnd = true;
      this.notShowEndColor = true;
      this.notShowEndLetters = false;
    }
  }

  checkLocaleStorageColor(){
    let times = this.localStorageService.getNumberExercicePlayed("nbacktrainingcolor");
    if(times != null){
        this.numbertimesplayedColor = Number(times);
    }
  }

  checkLocaleStorageLetter(){
    let times = this.localStorageService.getNumberExercicePlayed("nbacktrainingletters");
    if(times != null){
        this.numbertimesplayedLetter = Number(times);
    }
  }

  changeLanguage(){
    //changeLanguage when page is on front
    if(this.elementRef.nativeElement.offsetParent != null) {
      this.translate.translate.get(
        [
          'pages.exercices.games.6.title',
          'pages.exercices.games.6.subtitle',
          'pages.exercices.games.6.explanations',
          'pages.exercices.games.6.message1',
          'pages.exercices.games.6.message2',
          'pages.exercices.games.6.message3',
          'pages.exercices.games.6.messageSuccess',
          'pages.exercices.games.6.messageError',
          'pages.exercices.games.6.messageEnd',
          'pages.exercices.games.6.match',
          'pages.exercices.games.6.nomatch',
          'pages.exercices.games.6.color',
          'pages.exercices.games.6.letters',
          'pages.exercices.games.6.messageEndNotColor',
          'pages.exercices.games.6.messageEndNotLetters',
          'join',
          'endgaming',
          'highest'
        ]
      )
      .subscribe(translations => {
        this.title = translations['pages.exercices.games.6.title'];
        this.subTitle = translations['pages.exercices.games.6.subtitle'];
        this.explaination = translations['pages.exercices.games.6.explanations'];
        this.message1 = translations['pages.exercices.games.6.message1'];
        this.message2 = translations['pages.exercices.games.6.message2'];
        this.message3 = translations['pages.exercices.games.6.message3'];
        this.messageSuccess = translations['pages.exercices.games.6.messageSuccess'];
        this.messageError = translations['pages.exercices.games.6.messageError'];
        this.messageEnd = translations['pages.exercices.games.6.messageEnd'];
        this.match =  translations['pages.exercices.games.6.match'];
        this.nomatch =  translations['pages.exercices.games.6.nomatch'];
        this.color =  translations['pages.exercices.games.6.color'],
        this.letters =  translations['pages.exercices.games.6.letters'];
        this.messageNotColor = translations['pages.exercices.games.6.messageEndNotColor'];
        this.messageNotLetters = translations['pages.exercices.games.6.messageEndNotLetters'];
        this.joinus = translations['join'];
        this.endgaming = translations['endgaming'];
        this.bestScoreText = translations['highest'];
      });
    }
  }

  addButtonClass(){
    if(!this.start){
      return 'button-width50';
    }
    else{
      return 'button-width50 grey';
    }
  }

  startGame() {
    if(!this.showEnd || this.notShowEndColor || this.notShowEndLetters){
      this.start = true;
      this.showScore = false;
      this.message = this.message1;
      if(!this.win){
        this.score = 0;
      }
      this.scrollToGameElement();
    }
  }

  chooseLevel(level:string) {
    this.typeLevel = level;
    this.activeIndex = Math.floor(Math.random() * 9);
    if(this.typeLevel === 'levelcolor'){
      this.checkLocaleStorageColor();
      if(this.numbertimesplayedColor == 3){
        this.checkLocaStorage();
      }
      else{
        this.showScore = true;
        this.history.push(this.activeIndex);
        this.message = this.message2;
        setTimeout(() => this.next(), 800);
      }
    }
    else{
      this.checkLocaleStorageLetter();
      if(this.numbertimesplayedLetter == 3){
        this.checkLocaStorage();
      }
      else{
        this.showScore = true;
        this.currentLetter = this.randomLetter();
        this.showTile = true;
        this.message = this.message2;
        setTimeout(() => this.next(), 800);
      }
    }
  }

  wait(){
    this.activeIndex = -1;
    setTimeout(() => this.next(), 800);
  }

  next() {
    this.message = '';
    this.showTile = false;

    if(this.typeLevel === 'levelletters'){
      setTimeout(() => {
        this.activeIndex = Math.floor(Math.random() * 9);

        this.previousLetter = this.currentLetter;
        this.currentLetter = this.randomLetter();

        this.showTile = true;

        this.step++;
        this.progress = (this.step / this.totalSteps) * 100;
      }, 200);
    }
    else{
      this.activeIndex = Math.floor(Math.random() * 9);
      this.history.push(this.activeIndex);

      this.step++;
      this.progress = (this.step / this.totalSteps) * 100;
      this.message = this.message3;
    }
    this.sound.playPop(); 
  }

  randomLetter() {
    return this.lettersArray[Math.floor(Math.random() * this.letters.length)];
  }

  answer(isMatch: boolean) {
    if(this.typeLevel === 'levelcolor'){
      if (this.history.length <= this.n) {
        this.wait();
        return;
      }
    }
    else{
      if (!this.previousLetter) {
        this.next();
        return;
      }
    }
    
    let correct = false;
    let current = -1;
    let previous = -1;
    
    if(this.typeLevel === 'levelcolor'){
      current = this.history[this.history.length - 1];
      previous = this.history[this.history.length - 1 - this.n];
      correct = current === previous;
    }
    else{
      correct = this.currentLetter === this.previousLetter;
    }

    if (isMatch === correct) {
      this.score++;
      this.message = this.messageSuccess;
      navigator.vibrate?.(50);
      this.sound.playCorrect();
    } else {
      this.message = this.messageError;
      if (!correct) {
        this.lives--;
        this.sound.playWrong();
        if (this.lives === 0) {
          this.endGame();
          return;
        }
      }
      navigator.vibrate?.([50, 50, 50]);
    }
    this.activeIndex = -1;
    if (this.step >= this.totalSteps) {
      this.endGame();
    } else {
      setTimeout(() => this.next(), 600);
    }
  }

  setNBackTrainScore(){

  }

  endGame() {
    if(this.typeLevel === 'levelcolor'){
      this.numbertimesplayedColor++;
      this.localStorageService.setBestScoreExercicePlayed("nbacktrainingcolor",this.numbertimesplayedColor);
      let score = this.localStorageService.getBestScoreExercicePlayed("nbacktrainingscorecolor");
      if(score !=undefined && score != null){
        if(Number(score)<this.score){
          this.localStorageService.setBestScoreExercicePlayed("nbacktrainingscorecolor",this.score);
        }
      }
      if(this.numbertimesplayedColor == 3){
        this.checkLocaStorage();
      }
    }
    else{
      this.numbertimesplayedLetter++;
      this.localStorageService.setBestScoreExercicePlayed("nbacktrainingletters",this.numbertimesplayedLetter);
      let score = this.localStorageService.getBestScoreExercicePlayed("nbacktrainingscoreletters");
      if(score !=undefined && score != null){
        if(Number(score)<this.score){
          this.localStorageService.setBestScoreExercicePlayed("nbacktrainingscoreletters",this.score);
        }
      }
      if(this.numbertimesplayedLetter == 3){
        this.checkLocaStorage();
      }
    }

    this.start = false;
    this.history= [];
    this.n = 1;
    this.step = 0;
    this.totalSteps = 10;
    this.progress = 0;
    this.lives = 3;
    this.message = this.messageEnd;
    this.typeLevel = '';
  }

   scrollToGameElement(){
    if (this.gameElement != null) {
      let el = this.gameElement.nativeElement as HTMLElement
      el.scrollIntoView();
    }
  }

  join(){
    this.showEnd = false;
    this.appComponent.scrollToFooterElement();
  }

  quit(){
    if(this.numbertimesplayedColor != 3 || this.numbertimesplayedLetter !=3){
      this.showEnd = false;
    }
    else{
      this.router.navigate(["exercices"]);
    }
  }
}
