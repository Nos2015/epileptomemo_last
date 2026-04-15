import { Component, ElementRef, OnInit} from '@angular/core';
import { AppComponent } from '../../../app.component';
import { TranslateappService } from '../../../services/translateapp.service';
import { Router } from '@angular/router';

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
  selectedLetter = '';
  message2 = "";
  chooseLetter = false;
  letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  score = 0;

  words:any;

  currentIndex = 0;
  userAnswer = '';

  feedback: string | null = null;

  lives = 3;
  streak = 0;
  endOfGame = false;
  victory = false;
  victoryText = "";
  loose = false;
  looseText = "";
  showResult = false;
  total = 5;

  validate = "";
  startover = "";
  exit = "";
  answer = "";

  WORDS = [
    {
      letter:"A",
      values:[
        { definition: "Fruit rouge ou vert", answer: "avocat" },
        { definition: "Animal qui vole la nuit", answer: "aigle" },
        { definition: "Lieu où atterrissent les avions", answer: "aéroport" },
        { definition: "Action d'aider quelqu'un", answer: "assistance" },
        { definition: "Instrument pour écrire au tableau", answer: "ardoise" }
      ]
    },
    {

      letter:"B",
      values: [
        { definition: "Fruit jaune", answer: "banane" },
        { definition: "Objet pour lire", answer: "bouquin" },
        { definition: "Animal qui aboie", answer: "berger" },
        { definition: "Lieu où l'on dort", answer: "bungalow" },
        { definition: "Transport à deux roues", answer: "bicyclette" }
      ]
    },
    {
        letter:"C",
        values:[
        { definition: "Organe qui pompe le sang", answer: "coeur" },
        { definition: "Animal qui miaule", answer: "chat" },
        { definition: "Véhicule à 4 roues", answer: "car" },
        { definition: "Couleur du ciel", answer: "cyan" },
        { definition: "Objet pour écrire", answer: "crayon" }
      ]
    },
    {
      letter:"D",
      values: [
        { definition: "Animal qui nage", answer: "dauphin" },
        { definition: "Lieu désertique", answer: "désert" },
        { definition: "Partie du corps pour voir", answer: "doigt" },
        { definition: "Boisson", answer: "diabolo" },
        { definition: "Moment de la journée", answer: "déjeuner" }
      ]
    },
    {
      letter: "E",
      values: [
        { definition: "Animal avec une trompe", answer: "éléphant" },
        { definition: "Lieu pour apprendre", answer: "école" },
        { definition: "Liquide pour écrire", answer: "encre" },
        { definition: "Sortie ou fuite", answer: "évasion" },
        { definition: "Surface d’affichage", answer: "écran" }
      ]
    },
    {
      letter:"F",
      values:[
        { definition: "Animal sauvage", answer: "fauve" },
        { definition: "Objet pour s'asseoir", answer: "fauteuil" },
        { definition: "Lieu pour cuisiner", answer: "four" },
        { definition: "Action de courir", answer: "fuite" },
        { definition: "Objet pour écrire", answer: "feutre" }
      ]
    },
    {
      letter:"G",
      values:[
        { definition: "Fruit vert", answer: "grenade" },
        { definition: "Objet pour jouer", answer: "guitare" },
        { definition: "Lieu naturel", answer: "grotte" },
        { definition: "Vêtement", answer: "gant" },
        { definition: "Action de gagner", answer: "gain" }
      ]
    },
    {
      letter:"H",
      values:[
        { definition: "Lieu pour vivre", answer: "habitat" },
        { definition: "Transport en mer", answer: "hydravion" },
        { definition: "Action de rire", answer: "hilarité" },
        { definition: "Objet pour se couvrir", answer: "habit" },
        { definition: "Liquide du corps", answer: "hormone" }
      ]
    },
    {
      letter:"I",
      values:[
        { definition: "Pays d’Europe", answer: "italie" },
        { definition: "Objet informatique", answer: "imprimante" },
        { definition: "Action de penser", answer: "idée" },
        { definition: "Lieu imaginaire", answer: "île" },
        { definition: "Image mentale", answer: "illusion" }
      ]
    },
    {
      letter:"J",
      values:[
        { definition: "Fruit orange", answer: "jus" },
        { definition: "Objet pour s’asseoir", answer: "jambe" },
        { definition: "Animal de la jungle", answer: "jaguar" },
        { definition: "Sport avec ballon", answer: "jeu" },
        { definition: "Vêtement", answer: "jupe" }
      ]
    },
    {
      letter:"K",
      values:[
        { definition: "Sport de combat", answer: "karaté" },
        { definition: "Animal australien", answer: "kangourou" },
        { definition: "Ville japonaise", answer: "kyoto" },
        { definition: "Mot anglais pour gentil", answer: "kind" },
        { definition: "Terme scientifique", answer: "kelvin" }
      ]
    },
    {
      letter:"L",
      values:[
        { definition: "Animal roi de la jungle", answer: "lion" },
        { definition: "Objet pour lire", answer: "livre" },
        { definition: "Partie du corps", answer: "langue" },
        { definition: "Objet lumineux", answer: "lampe" },
        { definition: "Liquide blanc", answer: "lait" }
      ]
    },
    {
      letter:"M",
      values:[
        { definition: "Planète rouge", answer: "mars" },
        { definition: "Animal qui miaule", answer: "minou" },
        { definition: "Lieu pour habiter", answer: "maison" },
        { definition: "Objet pour manger", answer: "fourchette" },
        { definition: "Action de se souvenir", answer: "mémoire" }
      ]
    },
    {
      letter:"N",
      values:[
        { definition: "Pays nordique", answer: "norvège" },
        { definition: "Moment de la journée", answer: "nuit" },
        { definition: "Animal marin", answer: "narval" },
        { definition: "Nombre", answer: "neuf" },
        { definition: "Objet numérique", answer: "numéro" }
      ]
    },
    {
      letter:"O",
      values:[
        { definition: "Animal qui vole la nuit", answer: "oiseau" },
        { definition: "Partie du corps", answer: "oeil" },
        { definition: "Forme ronde", answer: "ovale" },
        { definition: "Objet pour écouter", answer: "oreille" },
        { definition: "Lieu naturel", answer: "océan" }
      ]
    },
    {
      letter:"P",
      values:[
        { definition: "Fruit rouge", answer: "pomme" },
        { definition: "Animal qui nage", answer: "poisson" },
        { definition: "Objet pour écrire", answer: "stylo" },
        { definition: "Lieu pour dormir", answer: "lit" },
        { definition: "Objet électronique", answer: "portable" }
      ]
    },
    {
      letter:"Q",
      values:[
        { definition: "Jeu de stratégie", answer: "quiz" },
        { definition: "Animal à long cou", answer: "quetzal" },
        { definition: "Mot pour question", answer: "question" },
        { definition: "File d’attente", answer: "queue" },
        { definition: "Nombre en maths", answer: "quotient" }
      ]
    },
    {
      letter:"R",
      values:[
        { definition: "Couleur chaude", answer: "rouge" },
        { definition: "Animal", answer: "rat" },
        { definition: "Objet pour écrire", answer: "règle" },
        { definition: "Lieu pour courir", answer: "route" },
        { definition: "Plante", answer: "rose" }
      ]
    },
    {
      letter:"S",
      values:[
        { definition: "Animal qui glisse", answer: "serpent" },
        { definition: "Objet pour écrire", answer: "stylo" },
        { definition: "Lieu pour dormir", answer: "sommeil" },
        { definition: "Objet pour s’asseoir", answer: "siège" },
        { definition: "Astre", answer: "soleil" }
      ]
    },
    {
      letter:"T",
      values:[
        { definition: "Animal domestique", answer: "tigre" },
        { definition: "Objet pour lire l’heure", answer: "temps" },
        { definition: "Lieu pour manger", answer: "table" },
        { definition: "Objet électronique", answer: "téléphone" },
        { definition: "Boisson chaude", answer: "thé" }
      ]
    },
    {
      letter:"U",
      values:[
        { definition: "Objet quotidien", answer: "ustensile" },
        { definition: "Animal marin", answer: "oursin" },
        { definition: "Ville", answer: "utrecht" },
        { definition: "Instrument", answer: "ukulélé" },
        { definition: "Objet informatique", answer: "usb" }
      ]
    },
    {
      letter:"V",
      values:[
        { definition: "Moyen de transport", answer: "voiture" },
        { definition: "Animal", answer: "vache" },
        { definition: "Objet pour écrire", answer: "verre" },
        { definition: "Lieu naturel", answer: "vallée" },
        { definition: "Action de voir", answer: "vision" }
      ]
    },
    {
      letter:"W",
      values:[
        { definition: "Ville américaine", answer: "washington" },
        { definition: "Sport", answer: "waterpolo" },
        { definition: "Objet informatique", answer: "wifi" },
        { definition: "Animal", answer: "wallaby" },
        { definition: "Mot anglais courant", answer: "world" }
      ]
    },
    {
      letter:"X",
      values:[
        { definition: "Instrument de musique", answer: "xylophone" },
        { definition: "Nom scientifique", answer: "xénon" },
        { definition: "Mot pour étranger", answer: "xénophile" },
        { definition: "Symbole mathématique", answer: "x" },
        { definition: "Maladie ancienne", answer: "xérémie" }
      ]
    },
    {
      letter:"Y",
      values:[
        { definition: "Sport", answer: "yoga" },
        { definition: "Animal", answer: "yak" },
        { definition: "Ville", answer: "yokohama" },
        { definition: "Objet", answer: "yoyo" },
        { definition: "Nom propre", answer: "yann" }
      ]
    },
    {
      letter:"Z",
      values:[
        { definition: "Animal rayé", answer: "zèbre" },
        { definition: "Objet pour dormir", answer: "zafu" },
        { definition: "Sport", answer: "zumba" },
        { definition: "Ville", answer: "zurich" },
        { definition: "Animal marin", answer: "zooplancton" }
      ]
    }
];

constructor(public appComponent: AppComponent,
                public translate: TranslateappService,
                private elementRef: ElementRef,
                private router : Router,

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
          'pages.exercices.games.3.message2',
          'pages.exercices.games.3.victory',
          'pages.exercices.games.3.loose',
          'validate',
          'startover',
          'exit',
          'pages.exercices.games.3.answer',
        ]
      )
      .subscribe(translations => {
        this.title = translations['pages.exercices.games.3.title'];
        this.subTitle = translations['pages.exercices.games.3.subtitle'];
        this.explaination = translations['pages.exercices.games.3.explanations'];
        this.message2 = translations['pages.exercices.games.3.message2'];
        this.victoryText = translations['pages.exercices.games.3.victory'];
        this.looseText = translations['pages.exercices.games.3.loose'];
        this.validate = translations['validate'];
        this.startover = translations['startover'];
        this.exit = translations['exit'];
        this.answer = translations['pages.exercices.games.3.answer'];
      });
    }
  }

  selectLetter(letter: string) {
    this.currentIndex = 0;
    for (const questions of this.WORDS) {
      if(letter == questions.letter){
        this.selectedLetter = letter;
        this.words = questions.values;
        this.chooseLetter = true;
      }
    }
    window.scroll(0,0);
  }

  get currentWord() {
    return this.words[this.currentIndex];
  }

  submit() {
    const correct = this.userAnswer.toLowerCase().trim();

    if (correct === this.currentWord.answer) {
      this.feedback = "✅ Correct";
      this.streak++;
      this.score++;
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
    }, 1000);
  }

  next() {
    this.userAnswer = '';
    this.feedback = null;

    if(this.currentIndex<=5){
      this.currentIndex++;
    }
    
    if ((this.currentIndex+1) > this.words.length) {
      this.currentIndex--;
      this.endGame();
    }
  }

  endGame() {
    this.victory = true;
    this.reset();
  }

  gameOver() {
    this.loose = true;
    this.reset();
  }

  reset() {
    this.endOfGame = true;
    this.feedback = null;
    this.streak = 0;
    this.showResult = true;
  }

  restart(){
    window.scroll(0,0);
    this.score = 0;
    this.victory = false;
    this.loose = false;
    this.showResult = false;
    this.chooseLetter = false;
    this.lives = 3;
  }

  quit(){
    this.router.navigate(["exercices"]);
  }
}
