import { Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { TranslateappService } from '../../../services/translateapp.service';

@Component({
  selector: 'app-quickbrain',
  standalone: false,
  templateUrl: './quickbrain.component.html',
  styleUrl: './quickbrain.component.scss'
})
export class QuickbrainComponent implements OnInit{
  title = "";
  subTitle = "";
  explaination = "";
  score = 0;
  start = false;
  startChooseLevel = false;
  message = "";
  message1 = "";
  message2 = "";   
  timeGame  = 0;
  typeQuestion = "written";
  language = "fr";
  questionAsk =  { type: "", question: "", questionEn:"", choices: ["", "", ""], image:"", answer: "" };
  win = false;
  messageWrong = "";
  messageSuccess = "";
  randomChoices = [];
  levelsHtml:any;
  levelHtml:any;
  timerInterval: any;
  levelChoose = "";
  timeChoose = 0;

  @ViewChild('game') gameElement!: ElementRef;

  levelsElement =viewChild<ElementRef<HTMLElement>>('insertremovelevel');

  constructor(public appComponent: AppComponent,
              public translate: TranslateappService,
              private elementRef: ElementRef,
  ){}

  lastQuestions: number[] = [];
  questions = [
    { type: "written", question: "Quel nombre est le plus grand ?", questionEn:"", choices: ["2", "8", "5"], image:"", answer: "8" },
    { type: "written", question: "Quel nombre est le plus petit ?", questionEn:"",choices: ["7", "1", "4"], image:"",answer: "1" },
    { type: "written", question: "Quel chiffre est pair ?", questionEn:"",choices: ["3", "6", "9"], image:"",answer: "6" },
    { type: "written", question: "Quel chiffre est impair ?", questionEn:"",choices: ["2", "4", "7"], image:"",answer: "7" },
    { type: "written", question: "Quel nombre est entre 3 et 5 ?",questionEn:"", choices: ["2", "4", "6"], image:"",answer: "4" },

    { type: "written", question: "Quel mot est un fruit ?", questionEn:"",choices: ["Pomme", "Chaise", "Livre"], image:"",answer: "Pomme" },
    { type: "written", question: "Quel mot est un animal ?", questionEn:"",choices: ["Chat", "Table", "Voiture"],image:"", answer: "Chat" },
    { type: "written", question: "Quel mot est un objet ?", questionEn:"",choices: ["Stylo", "Chien", "Banane"], image:"",answer: "Stylo" },
    { type: "written", question: "Quel mot est une couleur ?", questionEn:"",choices: ["Rouge", "Chat", "Maison"], image:"",answer: "Rouge" },
    { type: "written", question: "Quel mot est un vêtement ?", questionEn:"",choices: ["T-shirt", "Chien", "Banane"], image:"",answer: "T-shirt" },

    { type: "written", question: "Quel mot est différent ?", questionEn:"",choices: ["Chien", "Chat", "Voiture"], image:"",answer: "Voiture" },
    { type: "written", question: "Quel mot est différent ?", questionEn:"",choices: ["Banane", "Pomme", "Chaise"], image:"",answer: "Chaise" },
    { type: "written", question: "Quel mot est différent ?", questionEn:"",choices: ["Rouge", "Bleu", "Table"], image:"",answer: "Table" },
    { type: "written", question: "Quel mot est différent ?", questionEn:"",choices: ["Voiture", "Bus", "Pomme"], image:"",answer: "Pomme" },
    { type: "written", question: "Quel mot est différent ?", questionEn:"",choices: ["Stylo", "Crayon", "Chien"], image:"",answer: "Chien" },

    { type: "written", question: "Quelle lettre est une voyelle ?", questionEn:"",choices: ["B", "E", "T"], image:"",answer: "E" },
    { type: "written", question: "Quelle lettre est une consonne ?", questionEn:"",choices: ["A", "O", "F"], image:"",answer: "F" },
    { type: "written", question: "Quelle lettre apparaît deux fois ?", questionEn:"",choices: ["A", "B", "A"], image:"",answer: "A" },
    { type: "written", question: "Quelle lettre est la première ?", questionEn:"",choices: ["C", "A", "B"], image:"",answer: "A" },
    { type: "written", question: "Quelle lettre est la dernière ?", questionEn:"",choices: ["X", "Z", "Y"], image:"",answer: "Z" },

    { type: "written", question: "Combien font 2 + 2 ?", questionEn:"",choices: ["3", "4", "5"],image:"", answer: "4" },
    { type: "written", question: "Combien font 5 - 3 ?", questionEn:"",choices: ["1", "2", "3"], image:"",answer: "2" },
    { type: "written", question: "Combien font 3 + 4 ?", questionEn:"",choices: ["6", "7", "8"], image:"",answer: "7" },
    { type: "written", question: "Combien font 6 - 1 ?", questionEn:"",choices: ["4", "5", "6"], image:"",answer: "5" },
    { type: "written", question: "Combien font 2 + 5 ?", questionEn:"",choices: ["6", "7", "8"], image:"",answer: "7" },

    { type: "written", question: "Quel objet sert à écrire ?", questionEn:"",choices: ["Stylo", "Chaise", "Voiture"], image:"",answer: "Stylo" },
    { type: "written", question: "Quel objet sert à dormir ?", questionEn:"",choices: ["Lit", "Table", "Livre"], image:"",answer: "Lit" },
    { type: "written",question: "Quel objet sert à manger ?", questionEn:"",choices: ["Fourchette", "Livre", "Téléphone"], image:"",answer: "Fourchette" },
    { type: "written", question: "Quel objet sert à appeler ?", questionEn:"",choices: ["Téléphone", "Chaise", "Banane"], image:"",answer: "Téléphone" },
    { type: "written", question: "Quel objet sert à lire ?", questionEn:"",choices: ["Livre", "Stylo", "Table"], image:"",answer: "Livre" },

    { type: "written",question: "Quel est un animal domestique ?", questionEn:"",choices: ["Chien", "Lion", "Requin"], image:"",answer: "Chien" },
    { type: "written",question: "Quel est un animal sauvage ?", questionEn:"",choices: ["Lion", "Chien", "Chat"], image:"",answer: "Lion" },
    { type: "written",question: "Quel animal vole ?", questionEn:"",choices: ["Oiseau", "Chien", "Poisson"], image:"",answer: "Oiseau" },
    { type: "written",question: "Quel animal nage ?", questionEn:"",choices: ["Poisson", "Chat", "Oiseau"], image:"",answer: "Poisson" },
    { type: "written",question: "Quel animal miaule ?", questionEn:"",choices: ["Chat", "Chien", "Oiseau"], image:"",answer: "Chat" },

    { type: "written",question: "Quel est une boisson ?", questionEn:"",choices: ["Eau", "Chaise", "Livre"], image:"",answer: "Eau" },
    { type: "written",question: "Quel est un légume ?", questionEn:"",choices: ["Carotte", "Banane", "Pomme"], image:"",answer: "Carotte" },
    { type: "written",question: "Quel est un fruit ?", questionEn:"",choices: ["Orange", "Table", "Stylo"], image:"",answer: "Orange" },
    { type: "written",question: "Quel est un dessert ?", questionEn:"",choices: ["Gâteau", "Chaise", "Voiture"], image:"",answer: "Gâteau" },
    { type: "written",question: "Quel est un repas ?", questionEn:"",choices: ["Pizza", "Stylo", "Livre"], image:"",answer: "Pizza" },

    { type: "written",question: "Quel jour vient après lundi ?", questionEn:"",choices: ["Mardi", "Dimanche", "Vendredi"], image:"",answer: "Mardi" },
    { type: "written",question: "Quel jour vient avant vendredi ?", questionEn:"",choices: ["Jeudi", "Samedi", "Dimanche"], image:"",answer: "Jeudi" },
    { type: "written",question: "Quel est un jour du week-end ?", questionEn:"",choices: ["Dimanche", "Mardi", "Jeudi"], image:"",answer: "Dimanche" },
    { type: "written",question: "Quel mois est en été ?", questionEn:"",choices: ["Juillet", "Janvier", "Mars"], image:"",answer: "Juillet" },
    { type: "written",question: "Quel mois est en hiver ?", questionEn:"",choices: ["Janvier", "Juillet", "Août"], image:"",answer: "Janvier" },

    { type: "written",question: "Quel est une couleur chaude ?", questionEn:"",choices: ["Rouge", "Bleu", "Vert"], image:"",answer: "Rouge" },
    { type: "written",question: "Quel est une couleur froide ?", questionEn:"",choices: ["Bleu", "Rouge", "Orange"], image:"",answer: "Bleu" },
    { type: "written",question: "Quel est une couleur neutre ?", questionEn:"",choices: ["Gris", "Rouge", "Jaune"], image:"",answer: "Gris" },
    { type: "written",question: "Quelle couleur est le ciel ?", questionEn:"",choices: ["Bleu", "Vert", "Rouge"], image:"",answer: "Bleu" },
    { type: "written", question: "Quelle couleur est une banane ?", questionEn:"",choices: ["Jaune", "Bleu", "Rouge"],image:"", answer: "Jaune" },

    { type: "visual",question: "Scientifique célèbre avec cheveux en bataille", questionEn:"",choices: ["Albert Einstein", "Isaac Newton", "Nikola Tesla"], image:"1.jpeg", answer: "Albert Einstein" },
    { type: "visual",question: "Fondateur d’Apple", questionEn:"",choices: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg"], image:"2.jpeg", answer: "Steve Jobs" },
    { type: "visual",question: "Footballeur portugais célèbre", questionEn:"",choices: ["Cristiano Ronaldo", "Lionel Messi", "Neymar"], image:"3.jpeg", answer: "Cristiano Ronaldo" },
    { type: "visual",question: "Acteur de Titanic", questionEn:"",choices: ["Leonardo DiCaprio", "Brad Pitt", "Tom Cruise"], image:"4.jpeg", answer: "Leonardo DiCaprio" },
    { type: "visual", question: "Entrepreneur Tesla / SpaceX", questionEn:"",choices: ["Elon Musk", "Jeff Bezos", "Bill Gates"], image:"5.jpeg", answer: "Elon Musk" },

    { type: "visual",question: "Roi de la pop", questionEn:"",choices: ["Michael Jackson", "Prince", "Elvis Presley"], image:"6.jpeg", answer: "Michael Jackson" },
    { type: "visual",question: "Footballeur français légendaire", questionEn:"", choices: ["Zidane", "Mbappé", "Henry"], image:"7.jpeg", answer: "Zidane" },
    { type: "visual",question: "Scientifique célèbre (radioactivité)", questionEn:"",choices: ["Marie Curie", "Rosalind Franklin", "Ada Lovelace"], image:"8.jpeg", answer: "Marie Curie" },
    { type: "visual",question: "Actrice de Harry Potter", questionEn:"",choices: ["Emma Watson", "Scarlett Johansson", "Natalie Portman"], image:"9.jpeg", answer: "Emma Watson" },
    { type: "visual", question: "Star du rugby français, capitaine", questionEn:"",choices: ["Antoine Dupont", "Romain Ntamack", "Sébastien Chabal"], image:"10.jpeg", answer: "Antoine Dupont" },

    { type: "visual",question: "Roi de la pop", questionEn:"",choices: ["Michael Jackson", "Prince", "Elvis Presley"], image:"6.jpeg", answer: "Michael Jackson" },
    { type: "visual",question: "Footballeur français légendaire", questionEn:"",choices: ["Zidane", "Mbappé", "Henry"], image:"7.jpeg", answer: "Zidane" },
    { type: "visual",question: "Scientifique célèbre (radioactivité)", questionEn:"",choices: ["Marie Curie", "Rosalind Franklin", "Ada Lovelace"], image:"8.jpeg", answer: "Marie Curie" },
    { type: "visual",question: "Actrice de Harry Potter", questionEn:"",choices: ["Emma Watson", "Scarlett Johansson", "Natalie Portman"], image:"9.jpeg", answer: "Emma Watson" },
    { type: "visual", question: "Star du rugby français, capitaine", questionEn:"",choices: ["Antoine Dupont", "Romain Ntamack", "Sébastien Chabal"], image:"10.jpeg", answer: "Antoine Dupont" },

    { type: "visual",question: "Légende des All Black", questionEn:"",choices: ["Richie McCaw", "Dan Carter", "Jonah Lomu"], image:"11.jpeg", answer: "Richie McCaw"},
    { type: "visual",question: "Acteur Fight Club", questionEn:"",choices: ["Brad Pitt", "Tom Cruise", "Johnny Depp"], image:"12.jpeg", answer: "Brad Pitt" },
    { type: "visual",question: "Mission Impossible", questionEn:"",choices: ["Tom Cruise", "Will Smith", "Matt Damon"], image:"13.jpeg", answer: "Tom Cruise" },
    { type: "visual",question: "Pirates des Caraïbes", questionEn:"",choices: ["Johnny Depp", "Orlando Bloom", "Leonardo DiCaprio"], image:"14.jpeg", answer: "Johnny Depp" },
    { type: "visual", question: "Chanteuse américaine célèbre", questionEn:"",choices: ["Beyoncé", "Rihanna", "Ariana Grande"], image:"15.jpeg", answer: "Beyoncé" },

    { type: "visual",question: "Chanteuse Diamonds", questionEn:"",choices: ["Rihanna", "Beyoncé", "Shakira"], image:"16.jpeg", answer: "Rihanna"},
    { type: "visual",question: "Star du football français", questionEn:"",choices: ["Mbappé", "Griezmann", "Benzema"], image:"17.jpeg", answer: "Mbappé" },
    { type: "visual",question: "Footballeur argentin légendaire", questionEn:"",choices: ["Messi", "Ronaldo", "Neymar"], image:"18.jpeg", answer: "Messi" },
    { type: "visual",question: "Fondateur de Facebook", questionEn:"",choices: ["Mark Zuckerberg", "Elon Musk", "Jeff Bezos"], image:"19.jpeg", answer: "Mark Zuckerberg" },
    { type: "visual", question: "Scientifique gravité", questionEn:"",choices: ["Isaac Newton", "Einstein", "Galilée"], image:"20.jpeg", answer: "Isaac Newton" },

    { type: "visual",question: "Joueuse de tennis légendaire", questionEn:"",choices: ["Serena Williams", "Naomi Osaka", "Simona Halep"], image:"21.jpeg", answer: "Serena Williams"},
    { type: "visual",question: "Acteur de Matrix", questionEn:"",choices: ["Keanu Reeves", "Brad Pitt", "Tom Cruise"], image:"22.jpeg", answer: "Keanu Reeves" },
    { type: "visual",question: "Leader historique d'Afrique du Sud", questionEn:"",choices: ["Nelson Mandela", "Martin Luther King", "Barack Obama"], image:"23.jpeg", answer: "Nelson Mandela" },
    { type: "visual",question: "Acteur légendaire français", questionEn:"",choices: ["Jean Gabin", "Bourvil", "Lino Ventura"], image:"24.jpeg", answer: "Jean Gabin" },
    { type: "visual", question: "Acteur légendaire français", questionEn:"",choices: ["Lino Ventura", "Jean Gabin", "Louis de Funès"], image:"25.jpeg", answer: "Lino Ventura" },

  ];

ngOnInit(): void {
    window.scroll(0,0);
    this.appComponent.setHome(false);
    this.translate.comp$.subscribe(
      () => {
          this.changeLanguage();
      }
    );
    this.changeLanguage();
    let lang = localStorage.getItem("language");
    if (lang == null){
      this.language = "fr";
    }
    else{
      this.language = lang;
    }
    
  }

  changeLanguage(){
    //changeLanguage when page is on front
    if(this.elementRef.nativeElement.offsetParent != null) {
      this.translate.translate.get(
        [
          'pages.exercices.games.4.title',
          'pages.exercices.games.4.subtitle',
          'pages.exercices.games.4.explanations',
          'pages.exercices.games.4.message1',
          'pages.exercices.games.4.message2',
          'pages.exercices.games.4.messageWrong',
          'pages.exercices.games.4.messageSuccess',
        ]
      )
      .subscribe(translations => {
        this.title = translations['pages.exercices.games.4.title'];
        this.subTitle = translations['pages.exercices.games.4.subtitle'];
        this.explaination = translations['pages.exercices.games.4.explanations'];
        this.message1 = translations['pages.exercices.games.4.message1'];
        this.message2 = translations['pages.exercices.games.4.message2'];
        this.messageSuccess = translations['pages.exercices.games.4.messageSuccess'];
        this.messageWrong = translations['pages.exercices.games.4.messageWrong'];
      });
    }
  }

  addButtonClass(name:string, begin:boolean){
    if(!begin){
      if(!this.start){
        return name;
      }
      else{
        return name+' grey';
      }
    }
    else{
      if(!this.start){
        return name +' grey';
      }
      else{
        return name;
      }
    }
  }

  startGame() {
    this.start = true;
    this.message = this.message1;
  }
  
  chooseLevel(level:string){
    this.win = false;
    this.startChooseLevel = true;
    this.levelChoose = level;
    if(level == "easy"){
      this.timeGame = 8;
      this.timeChoose = 8;
    }
    else if (level == "medium"){
      this.timeGame = 6;
      this.timeChoose = 6;
    }
    else{
      this.timeGame = 4;
      this.timeChoose = 4;
    }

    this.startGameQuickBrain();
  }

  startGameQuickBrain(){
    clearInterval(this.timerInterval);
    this.startTimer();
    if(!this.win){
      this.score = 0;
    }
    
    const element = this.levelsElement();
    if (element) {
      element.nativeElement.style.visibility = 'hidden';
      element.nativeElement.style.height = '0px';
    }
    this.questionAsk = this.getRandomQuestion();
    
    if(this.language == 'fr'){
      this.message = this.questionAsk.question;
    }
    else{
      //this.message = question.questionEn;
      console.log("c en");
    }

    var m = this.questionAsk.choices.length, t, i;

    while (m) {    
      i = Math.floor(Math.random() * m--);
      t = this.questionAsk.choices[m];
      this.questionAsk.choices[m] = this.questionAsk.choices[i];
      this.questionAsk.choices[i] = t;
    }
}

  getRandomQuestion() {
    let index;

    do {
        index = Math.floor(Math.random() * this.questions.length);
      } while (this.lastQuestions.includes(index));

      this.lastQuestions.push(index);

      if (this.lastQuestions.length > 10) {
        this.lastQuestions.shift();
      }

      return this.questions[index];
  }

  end(message:string){
    this.message = message;
    this.start = false;
    this.win = false;
    this.startChooseLevel = false;
      const element = this.levelsElement();
    if (element) {
      element.nativeElement.style.visibility = 'visible';
      element.nativeElement.style.height = 'auto';
    }
  }

  responseanswer(response:string){
    if(this.questionAsk.answer== response){
      clearInterval(this.timerInterval);
      this.win = true;
      this.message = this.messageSuccess;
      this.score++;
      setTimeout(() => this.chooseLevel(this.levelChoose), 1000);
    }
    else{
      this.end(this.messageWrong);
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      this.timeGame--;
      if (this.timeGame <= 0) {
        this.handleTimeout();
      }
    }, 1000);
  }

  handleTimeout() {
    console.log("handleTimeout");
    clearInterval(this.timerInterval);

    setTimeout(() => {
      if(!this.win){
        this.end(this.messageWrong);
      }
    }, 1000);
  }
}
