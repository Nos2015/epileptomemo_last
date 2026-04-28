import { Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { TranslateappService } from '../../../services/translateapp.service';
import { SoundserviceService } from '../../../services/soundservice.service';

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

   constructor(public appComponent: AppComponent,
              public translate: TranslateappService,
              private elementRef: ElementRef,
              private sound: SoundserviceService
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
          'pages.exercices.games.6.letters'
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
    this.start = true;
     this.showScore = false;
    this.message = this.message1;
    if(!this.win){
      this.score = 0;
    }
    this.scrollToGameElement();
  }

  chooseLevel(level:string) {
    this.typeLevel = level;
    this.showScore = true;
     this.activeIndex = Math.floor(Math.random() * 9);
    if(this.typeLevel === 'levelcolor'){
      this.history.push(this.activeIndex);
    }
    else{
      this.currentLetter = this.randomLetter();
      this.showTile = true;
    }
    this.message = this.message2;
    setTimeout(() => this.next(), 800);
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

  endGame() {
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
}
