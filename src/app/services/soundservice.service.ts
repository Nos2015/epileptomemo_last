import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SoundserviceService {

  correct = new Audio('assets/sounds/correct.wav');
  wrong = new Audio('assets/sounds/wrong.wav');
  pop = new Audio('assets/sounds/pop.wav');

  constructor() { }

  playCorrect() {
    this.correct.currentTime = 0;
    this.correct.play();
  }

  playWrong() {
    this.wrong.currentTime = 0;
    this.wrong.play();
  }
  
  playPop() {
    this.pop.currentTime = 0;
    this.pop.play();
  }
}
