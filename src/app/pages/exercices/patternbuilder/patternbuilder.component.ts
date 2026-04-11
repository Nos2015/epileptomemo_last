import { Component, ElementRef, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { TranslateappService } from '../../../services/translateapp.service';

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


  constructor(public appComponent: AppComponent,
              public translate: TranslateappService,
              private elementRef: ElementRef,
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
    this.pattern = [];
    this.level = 1;
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
    this.start = true;
    this.nextRound();
  }

  nextRound() {
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
      red: new Audio('assets/sounds/red.mp3'),
      yellow: new Audio('assets/sounds/yellow.mp3'),
      green: new Audio('assets/sounds/green.mp3'),
      blue: new Audio('assets/sounds/blue.mp3')
    };

    sounds[color].play();
  }

  handleClick(color: string) {

    if (!this.isPlaying) return;

    this.playerInput.push(color);

    this.flash(color);

    const index = this.playerInput.length - 1;

    if (this.playerInput[index] !== this.pattern[index]) {
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

  gameOver() {
    this.message = this.wrong;
    this.isPlaying = false;
    this.start = false;
    this.level = 1;
    this.pattern = [];
    navigator.vibrate(200);

    /*setTimeout(() => {
      this.startGame();
    }, 2000);*/
  }


}
