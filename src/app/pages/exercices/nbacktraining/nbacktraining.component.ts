import { Component, ElementRef, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { TranslateappService } from '../../../services/translateapp.service';

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
  activeIndex = 0;

  history: number[] = [];

  n = 1;
  step = 0;
  totalSteps = 10;

  progress = 0;
  score = 0;

  feedback = '';
  lives = 3;

  start = false;

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
          'pages.exercices.games.6.title',
          'pages.exercices.games.6.subtitle',
          'pages.exercices.games.6.explanations'
        ]
      )
      .subscribe(translations => {
        this.title = translations['pages.exercices.games.6.title'];
        this.subTitle = translations['pages.exercices.games.6.subtitle'];
        this.explaination = translations['pages.exercices.games.6.explanations'];
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
    this.next();
  }

  next() {
    this.feedback = '';

    this.activeIndex = Math.floor(Math.random() * 9);
    this.history.push(this.activeIndex);

    this.step++;
    this.progress = (this.step / this.totalSteps) * 100;
  }

  answer(isMatch: boolean) {
    if (this.history.length <= this.n) {
      this.next();
      return;
    }

    const current = this.history[this.history.length - 1];
    const previous = this.history[this.history.length - 1 - this.n];

    const correct = current === previous;

    if (isMatch === correct) {
      this.score++;
      this.feedback = '✅ Correct!';
      navigator.vibrate?.(50);
    } else {
      this.feedback = '❌ Wrong!';
      if (!correct) {
        this.lives--;

        if (this.lives === 0) {
          this.endGame();
          return;
        }
      }
      navigator.vibrate?.([50, 50, 50]);
    }

    if (this.step >= this.totalSteps) {
      this.endGame();
    } else {
      setTimeout(() => this.next(), 600);
    }
  }

  endGame() {
    alert(`Score: ${this.score}/${this.totalSteps}`);
  }
}
