import { Component, ElementRef, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { TranslateappService } from '../../../services/translateapp.service';

@Component({
  selector: 'app-commonname',
  standalone: false,
  templateUrl: './commonname.component.html',
  styleUrl: './commonname.component.scss',
})
export class CommonnameComponent implements OnInit{
  title = "";
  subTitle = "";
  explaination = "";
  selectedLetter = 'C';
  score = 0;

  words = [
    { definition: "Organe qui pompe le sang", answer: "coeur" },
    { definition: "Animal qui miaule", answer: "chat" },
    { definition: "Véhicule à 4 roues", answer: "car" },
    { definition: "Couleur du ciel", answer: "cyan" },
    { definition: "Objet pour écrire", answer: "crayon" }
  ];

  currentIndex = 0;
  userAnswer = '';

  feedback: string | null = null;

  lives = 3;
  streak = 0;

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
          'pages.exercices.games.3.title',
          'pages.exercices.games.3.subtitle',
          'pages.exercices.games.3.explanations',
        ]
      )
      .subscribe(translations => {
        this.title = translations['pages.exercices.games.3.title'];
        this.subTitle = translations['pages.exercices.games.3.subtitle'];
        this.explaination = translations['pages.exercices.games.3.explanations'];
      });
    }
  }

  get currentWord() {
    return this.words[this.currentIndex];
  }

  submit() {
    const correct = this.userAnswer.toLowerCase().trim();

    if (correct === this.currentWord.answer) {
      this.feedback = "✅ Correct";
      this.streak++;
    } else {
      this.feedback = "❌ Mauvaise réponse";
      this.lives--;
      this.streak = 0;
    }

    if (this.lives <= 0) {
      this.gameOver();
      return;
    }

    setTimeout(() => {
      this.next();
    }, 800);
  }

  next() {
    this.userAnswer = '';
    this.feedback = null;

    this.currentIndex++;

    if (this.currentIndex >= this.words.length) {
      this.endGame();
    }
  }

  endGame() {
    alert("Bravo 🎉");
  }

  gameOver() {
    alert("Game Over 💀");
    this.reset();
  }

  reset() {
    this.currentIndex = 0;
    this.lives = 3;
    this.streak = 0;
  }

}
