import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { TranslateappService } from '../../../services/translateapp.service';

@Component({
  selector: 'app-visualpattern',
  standalone: false,
  templateUrl: './visualpattern.component.html',
  styleUrl: './visualpattern.component.scss'
})
export class VisualpatternComponent implements OnInit{
  title = "";
  subTitle = "";
  explaination = "";
  score = 0;
  start = false;
  message = "";
  level = 3;

  grid = Array(9).fill(false);
  pattern: number[] = [];
  player: number[] = [];
  playing = false;

  message1 = "";
  message1new = "";
  message2 = "";
  messageWrong = "";
  messageSuccess = "";

  win = false;

  @ViewChild('game') gameElement!: ElementRef;

  constructor(public appComponent: AppComponent,
              public translate: TranslateappService,
              private elementRef: ElementRef,
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
          'pages.exercices.games.2.title',
          'pages.exercices.games.2.subtitle',
          'pages.exercices.games.2.explanations',
          'pages.exercices.games.2.message1',
          'pages.exercices.games.2.message1new',
          'pages.exercices.games.2.message2',
          'pages.exercices.games.2.messageWrong',
          'pages.exercices.games.2.messageSuccess',
        ]
      )
      .subscribe(translations => {
        this.title = translations['pages.exercices.games.2.title'];
        this.subTitle = translations['pages.exercices.games.2.subtitle'];
        this.explaination = translations['pages.exercices.games.2.explanations'];
        this.message1 = translations['pages.exercices.games.2.message1'];
        this.message1new = translations['pages.exercices.games.2.message1new'];
        this.message2 = translations['pages.exercices.games.2.message2'];
        this.messageWrong = translations['pages.exercices.games.2.messageWrong'];
         this.messageSuccess = translations['pages.exercices.games.2.messageSuccess'];
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
    if(!this.win){
      this.score = 0;
    }
    this.start = true;
    this.scrollToGameElement();
    this.pattern = [];
    this.player = [];
    if(this.score == 0  || this.score < 0){
      this.message = this.message1;
    }
    else{
      this.message = this.message1new;
    }

    for (let i = 0; i < this.level; i++) {
      this.pattern.push(Math.floor(Math.random() * 9));
    }

    this.showPattern();
  }

  async showPattern() {
    await this.sleep(3000);
    this.message = '';
    this.playing = false;
    
    for (let i of this.pattern) {
      this.grid[i] = true;
      await this.sleep(800);
      this.grid[i] = false;
      await this.sleep(500);
      this.message = '';
    }

    this.message = this.message2;
    await this.sleep(1000);
    this.message = '';

    this.playing = true;
  }

  clickCell(index: number) {
    if (!this.playing) return;

    this.player.push(index);

    if (this.player[this.player.length - 1] !== this.pattern[this.player.length - 1]) {
      this.message = this.messageWrong;
      this.level = 3;
      this.start = false;
      this.win = false;
      return;
    }

    if (this.player.length === this.pattern.length) {
      this.message = this.messageSuccess;
      this.level++;
      this.score++;
      this.win = true;
      setTimeout(() => this.startGame(), 1000);
    }
  }

  sleep(ms: number) {
    return new Promise(res => setTimeout(res, ms));
  }

  scrollToGameElement(){
    if (this.gameElement != null) {
      let el = this.gameElement.nativeElement as HTMLElement
      el.scrollIntoView();
    }
  }
}
