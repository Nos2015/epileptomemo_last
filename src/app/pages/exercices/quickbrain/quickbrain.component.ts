import { Component, ElementRef, OnInit, viewChild, ViewChild } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { TranslateappService } from '../../../services/translateapp.service';
import { LocalstorageService } from '../../../services/localstorage.service';
import { Router } from '@angular/router';

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
  questionAsk =  { number: 0, type: "", question: "", questionEn:"", choices: ["", "", ""], choicesEn: ["", "", ""], image:"", answer: "", answerEn: "" };
  win = false;
  messageWrong = "";
  messageSuccess = "";
  randomChoices = [];
  levelsHtml:any;
  levelHtml:any;
  timerInterval: any;
  levelChoose = "";
  timeChoose = 0;
  easy = "";
  medium = "";
  hard = "";

  @ViewChild('game') gameElement!: ElementRef;

  levelsElement =viewChild<ElementRef<HTMLElement>>('insertremovelevel');

  constructor(public appComponent: AppComponent,
              public translate: TranslateappService,
              private elementRef: ElementRef,
              private router : Router,
              public localStorageService: LocalstorageService
  ){}

  lastQuestions: number[] = [];
  questions = [
    { number:0, type: "written", question: "Quel nombre est le plus grand ?", questionEn:"Which number is larger ?", choices: ["2", "8", "5"], choicesEn: ["2", "8", "5"], image:"", answer: "8", answerEn:"8" },
    { number:1, type: "written", question: "Quel nombre est le plus petit ?", questionEn:"Which number is the smallest?", choices: ["7", "1", "4"], choicesEn: ["7", "1", "4"], image:"",answer: "1",answerEn: "1" },
    { number:2, type: "written", question: "Quel chiffre est pair ?", questionEn:"Which number is even ?", choices: ["3", "6", "9"], choicesEn: ["3", "6", "9"], image:"",answer: "6",answerEn: "6" },
    { number:3, type: "written", question: "Quel chiffre est impair ?", questionEn:"Which number is odd? ", choices: ["2", "4", "7"], choicesEn: ["2", "4", "7"], image:"",answer: "7",answerEn: "7" },
    { number:4, type: "written", question: "Quel nombre est entre 3 et 5 ?",questionEn:"Which number is between 3 and 5 ?", choices: ["2", "4", "6"], choicesEn: ["2", "4", "6"], image:"",answer: "4",answerEn: "4" },

    { number:5, type: "written", question: "Quel mot est un fruit ?", questionEn:"Which word refers to a fruit ?", choices: ["Pomme", "Chaise", "Livre"], choicesEn: ["Apple", "Chair", "Book"], image:"",answer: "Pomme",answerEn: "Apple" },
    { number:6, type: "written", question: "Quel mot est un animal ?", questionEn:"Which word refers to an animal ?", choices: ["Chat", "Table", "Voiture"], choicesEn:["Cat","Table","Car"], image:"", answer: "Chat",answerEn: "Cat" },
    { number:7, type: "written", question: "Quel mot est un objet ?", questionEn:"Which word refers to an object ?", choices: ["Stylo", "Chien", "Banane"], choicesEn:["Pen","Dog","Banana"],  image:"",answer: "Stylo",answerEn: "Pen" },
    { number:8, type: "written", question: "Quel mot est une couleur ?", questionEn:"Which word refers to a color ?", choices: ["Rouge", "Chat", "Maison"], choicesEn:["Red","Cat","House"],  image:"",answer: "Rouge",answerEn: "Red" },
    { number:9, type: "written", question: "Quel mot est un vêtement ?", questionEn:"Which word refers to a piece of clothing ?", choices: ["T-shirt", "Chien", "Banane"], choicesEn:["T-shirt", "Dog", "Banana"],  image:"",answer: "T-shirt",answerEn: "T-shirt" },

    { number:10, type: "written", question: "Quel mot est différent ?", questionEn:"Which word is different ?",choices: ["Chien", "Chat", "Voiture"], choicesEn:["Dog", "Cat", "Car"], image:"",answer: "Voiture",answerEn: "Car" },
    { number:11, type: "written", question: "Quel mot est différent ?", questionEn:"Which word is different ?",choices: ["Banane", "Pomme", "Chaise"], choicesEn:["Banana","Apple","Chair"], image:"",answer: "Chaise",answerEn: "Chair" },
    { number:12, type: "written", question: "Quel mot est différent ?", questionEn:"Which word is different ?",choices: ["Rouge", "Bleu", "Table"], choicesEn:["Red","Blue","Table"], image:"",answer: "Table",answerEn: "Table" },
    { number:13, type: "written", question: "Quel mot est différent ?", questionEn:"Which word is different ?",choices: ["Voiture", "Bus", "Pomme"], choicesEn:["Car", "Bus", "Apple"], image:"",answer: "Pomme",answerEn: "Apple" },
    { number:14, type: "written", question: "Quel mot est différent ?", questionEn:"Which word is different ?",choices: ["Stylo", "Crayon", "Chien"], choicesEn:["Pen","Pencil","Dog"], image:"",answer: "Chien",answerEn: "Dog" },

    { number:15, type: "written", question: "Quelle lettre est une voyelle ?", questionEn:"Which letter is a vowel ?",choices: ["B", "E", "T"], choicesEn:["B", "E", "T"],  image:"",answer: "E",answerEn: "E" },
    { number:16, type: "written", question: "Quelle lettre est une consonne ?", questionEn:"Which letter is a consonant ?",choices: ["A", "O", "F"], choicesEn:["A", "O", "F"],  image:"",answer: "F",answerEn: "F" },
    { number:17, type: "written", question: "Quelle lettre apparaît deux fois ?", questionEn:"Which letter appears twice ?",choices: ["A", "B", "A"], choicesEn:["A", "B", "A"],  image:"",answer: "A",answerEn: "A" },
    { number:18, type: "written", question: "Quelle lettre est la première ?", questionEn:"Which letter comes first ?",choices: ["C", "A", "B"], choicesEn:["C", "A", "B"],  image:"",answer: "A",answerEn: "A" },
    { number:19, type: "written", question: "Quelle lettre est la dernière ?", questionEn:"Which letter is the last one ?",choices: ["X", "Z", "Y"], choicesEn:["X", "Z", "Y"],  image:"",answer: "Z",answerEn: "Z" },

    { number:20, type: "written", question: "Combien font 2 + 2 ?", questionEn:"What is 2 + 2 ?",choices: ["3", "4", "5"], choicesEn:["3", "4", "5"], image:"", answer: "4",answerEn: "4" },
    { number:21, type: "written", question: "Combien font 5 - 3 ?", questionEn:"What is 5 - 3 ",choices: ["1", "2", "3"], choicesEn:["1", "2", "3"], image:"",answer: "2",answerEn: "2" },
    { number:22, type: "written", question: "Combien font 3 + 4 ?", questionEn:"What is 3 + 4 ",choices: ["6", "7", "8"], choicesEn:["6", "7", "8"], image:"",answer: "7",answerEn: "7" },
    { number:23, type: "written", question: "Combien font 6 - 1 ?", questionEn:"What is 6 - 1 ",choices: ["4", "5", "6"], choicesEn:["4", "5", "6"], image:"",answer: "5",answerEn: "5" },
    { number:24, type: "written", question: "Combien font 2 + 5 ?", questionEn:"What is 2 + 5 ",choices: ["6", "7", "8"], choicesEn:["6", "7", "8"], image:"",answer: "7",answerEn: "7" },

    { number:25, type: "written", question: "Quel objet sert à écrire ?", questionEn:"What object is used for writing ?",choices: ["Stylo", "Chaise", "Voiture"], choicesEn:["Pen","Chair","Car"], image:"",answer: "Stylo",answerEn: "Pen" },
    { number:26, type: "written", question: "Quel objet sert à dormir ?", questionEn:"What object is used for sleeping ?",choices: ["Lit", "Table", "Livre"], choicesEn:["Bed", "Table", "Book"], image:"",answer: "Lit",answerEn: "Bed" },
    { number:27, type: "written",question: "Quel objet sert à manger ?", questionEn:"What object is used for eating ?",choices: ["Fourchette", "Livre", "Téléphone"], choicesEn:["Fork","Book","Phone"], image:"",answer: "Fourchette",answerEn: "Fork" },
    { number:28, type: "written", question: "Quel objet sert à appeler ?", questionEn:"What object is used to make a call ?",choices: ["Téléphone", "Chaise", "Banane"], choicesEn:["Phone","Chair","Banana"], image:"",answer: "Téléphone",answerEn: "Phone" },
    { number:29, type: "written", question: "Quel objet sert à lire ?", questionEn:"What object is used for reading ?",choices: ["Livre", "Stylo", "Table"], choicesEn:["Book", "Pen", "Table"], image:"",answer: "Livre",answerEn: "Book" },

    { number:30, type: "written",question: "Quel est un animal domestique ?", questionEn:"What is a pet ?",choices: ["Chien", "Lion", "Requin"], choicesEn:["Dog", "Lion", "Shark"], image:"",answer: "Chien",answerEn: "Dog" },
    { number:31, type: "written",question: "Quel est un animal sauvage ?", questionEn:"What is a wild animal ?",choices: ["Lion", "Chien", "Chat"], choicesEn:["Lion","Dog","Cat"], image:"",answer: "Lion",answerEn: "Lion" },
    { number:32, type: "written",question: "Quel animal vole ?", questionEn:"Which animal can fly ?",choices: ["Oiseau", "Chien", "Poisson"], choicesEn:["Bird", "Dog", "Fish"], image:"",answer: "Oiseau",answerEn: "Bird" },
    { number:33, type: "written",question: "Quel animal nage ?", questionEn:"Which animal can swim ?",choices: ["Poisson", "Chat", "Oiseau"], choicesEn:["Fish", "Cat", "Bird"], image:"",answer: "Poisson",answerEn: "Fish" },
    { number:34, type: "written",question: "Quel animal miaule ?", questionEn:"Which animal meows ?",choices: ["Chat", "Chien", "Oiseau"], choicesEn:["Cat","Dog","Bird"], image:"",answer: "Chat",answerEn: "Cat" },

    { number:35, type: "written",question: "Quel est une boisson ?", questionEn:"What is a drink ?",choices: ["Eau", "Chaise", "Livre"], choicesEn:["Water", "Chair", "Book"], image:"",answer: "Eau",answerEn: "Water" },
    { number:36, type: "written",question: "Quel est un légume ?", questionEn:"What is a vegetable ?",choices: ["Carotte", "Banane", "Pomme"], choicesEn:["Carrot","Banana","Apple"], image:"",answer: "Carotte",answerEn: "Carrot" },
    { number:37, type: "written",question: "Quel est un fruit ?", questionEn:"What is a fruit ?",choices: ["Orange", "Table", "Stylo"], choicesEn:["Orange", "Table", "Pen"], image:"",answer: "Orange",answerEn: "Orange" },
    { number:38, type: "written",question: "Quel est un dessert ?", questionEn:"What is a dessert ?",choices: ["Gâteau", "Chaise", "Voiture"], choicesEn:["Cake", "Chair", "Car"], image:"",answer: "Gâteau",answerEn: "Cake" },
    { number:39, type: "written",question: "Quel est un repas ?", questionEn:"What is a meal ?",choices: ["Pizza", "Stylo", "Livre"], choicesEn:["Pizza","Pen","Book"], image:"",answer: "Pizza",answerEn: "Pizza"  },

    { number:40, type: "written",question: "Quel jour vient après lundi ?", questionEn:"What day comes after Monday ?",choices: ["Mardi", "Dimanche", "Vendredi"], choicesEn:["Tuesday","Sunday","Friday"], image:"",answer: "Mardi",answerEn: "Tuesday" },
    { number:41, type: "written",question: "Quel jour vient avant vendredi ?", questionEn:"What day comes before Friday ?",choices: ["Jeudi", "Samedi", "Dimanche"], choicesEn:["Thursday", "Saturday", "Sunday"], image:"",answer: "Jeudi",answerEn: "Thursday" },
    { number:42, type: "written",question: "Quel est un jour du week-end ?", questionEn:"What is a weekend day ?",choices: ["Dimanche", "Mardi", "Jeudi"], choicesEn:["Sunday","Tuesday","Thursday"], image:"",answer: "Dimanche",answerEn: "Sunday" },
    { number:43, type: "written",question: "Quel mois est en été ?", questionEn:"Which month is in the summer ?",choices: ["Juillet", "Janvier", "Mars"], choicesEn:["July", "January", "March"], image:"",answer: "Juillet",answerEn: "July" },
    { number:44, type: "written",question: "Quel mois est en hiver ?", questionEn:"Which month is in winter ?",choices: ["Janvier", "Juillet", "Août"], choicesEn:["January", "July", "August"], image:"",answer: "Janvier",answerEn: "January" },

    { number:45, type: "written",question: "Quel est une couleur chaude ?", questionEn:"What is a hot color ?",choices: ["Rouge", "Bleu", "Vert"], choicesEn:["Red", "Blue", "Green"], image:"",answer: "Rouge",answerEn: "Red" },
    { number:46, type: "written",question: "Quel est une couleur froide ?", questionEn:"What is a cold color ?",choices: ["Bleu", "Rouge", "Orange"], choicesEn:["Blue", "Red", "Orange"], image:"",answer: "Bleu",answerEn: "Blue" },
    { number:47, type: "written",question: "Quel est une couleur neutre ?", questionEn:"What is a neutral color ?",choices: ["Gris", "Rouge", "Jaune"], choicesEn:["Grey","Red","Yellow"], image:"",answer: "Gris",answerEn: "Grey" },
    { number:48, type: "written",question: "Quelle couleur a le ciel ?", questionEn:"What color is the sky ?",choices: ["Bleu", "Vert", "Rouge"], choicesEn:["Blue", "Green", "Red"], image:"",answer: "Bleu",answerEn: "Blue" },
    { number:49, type: "written", question: "Quelle couleur a une banane ?", questionEn:"What color is a banana ?",choices: ["Jaune", "Bleu", "Rouge"], choicesEn:["Yellow", "Blue", "Red"], image:"", answer: "Jaune",answerEn: "Yellow" },

    { number:50, type: "visual",question: "Scientifique célèbre avec cheveux en bataille", questionEn:"Famous scientist with messy hair",choices: ["Albert Einstein", "Isaac Newton", "Nikola Tesla"], choicesEn:["Albert Einstein", "Isaac Newton", "Nikola Tesla"], image:"1.jpeg", answer: "Albert Einstein",answerEn: "Albert Einstein" },
    { number:51, type: "visual",question: "Fondateur d’Apple", questionEn:"Founder of Apple",choices: ["Steve Jobs", "Bill Gates", "Mark Zuckerberg"], choicesEn:["Steve Jobs", "Bill Gates", "Mark Zuckerberg"], image:"2.jpeg", answer: "Steve Jobs",answerEn: "Steve Jobs" },
    { number:52, type: "visual",question: "Footballeur portugais célèbre", questionEn:"Famous Portuguese soccer player",choices: ["Cristiano Ronaldo", "Lionel Messi", "Neymar"], choicesEn:["Cristiano Ronaldo", "Lionel Messi", "Neymar"], image:"3.jpeg", answer: "Cristiano Ronaldo",answerEn: "Cristiano Ronaldo" },
    { number:53, type: "visual",question: "Acteur de Titanic", questionEn:"Actor in Titanic",choices: ["Leonardo DiCaprio", "Brad Pitt", "Tom Cruise"], choicesEn:["Leonardo DiCaprio", "Brad Pitt", "Tom Cruise"], image:"4.jpeg", answer: "Leonardo DiCaprio",answerEn: "Leonardo DiCaprio" },
    { number:54, type: "visual", question: "Entrepreneur Tesla / SpaceX", questionEn:"Tesla/SpaceX Entrepreneur",choices: ["Elon Musk", "Jeff Bezos", "Bill Gates"], choicesEn:["Elon Musk", "Jeff Bezos", "Bill Gates"], image:"5.jpeg", answer: "Elon Musk",answerEn: "Elon Musk" },

    { number:55, type: "visual",question: "Roi de la pop", questionEn:"King of Pop",choices: ["Michael Jackson", "Prince", "Elvis Presley"], choicesEn:["Michael Jackson", "Prince", "Elvis Presley"], image:"6.jpeg", answer: "Michael Jackson",answerEn: "Michael Jackson" },
    { number:56, type: "visual",question: "Footballeur français légendaire", questionEn:"Legendary French soccer player", choices: ["Zidane", "Mbappé", "Henry"], choicesEn:["Zidane", "Mbappé", "Henry"], image:"7.jpeg", answer: "Zidane",answerEn: "Zidane" },
    { number:57, type: "visual",question: "Scientifique célèbre (radioactivité)", questionEn:"Famous scientist (radioactivity)",choices: ["Marie Curie", "Rosalind Franklin", "Ada Lovelace"], choicesEn:["Marie Curie", "Rosalind Franklin", "Ada Lovelace"], image:"8.jpeg", answer: "Marie Curie",answerEn: "Marie Curie" },
    { number:58, type: "visual",question: "Actrice de Harry Potter", questionEn:"Harry Potter actress",choices: ["Emma Watson", "Scarlett Johansson", "Natalie Portman"], choicesEn:["Emma Watson", "Scarlett Johansson", "Natalie Portman"], image:"9.jpeg", answer: "Emma Watson",answerEn: "Emma Watson" },
    { number:59, type: "visual", question: "Star du rugby français, capitaine", questionEn:"French rugby star, captain",choices: ["Antoine Dupont", "Romain Ntamack", "Sébastien Chabal"], choicesEn:["Antoine Dupont", "Romain Ntamack", "Sébastien Chabal"], image:"10.jpeg", answer: "Antoine Dupont",answerEn: "Antoine Dupont" },

    { number:60, type: "visual",question: "Légende des All Black", questionEn:"All Blacks Legend",choices: ["Richie McCaw", "Dan Carter", "Jonah Lomu"], choicesEn:["Richie McCaw", "Dan Carter", "Jonah Lomu"], image:"11.jpeg",answer: "Richie McCaw",answerEn: "Richie McCaw"},
    { number:61, type: "visual",question: "Acteur Fight Club", questionEn:"Actor in Fight Club",choices: ["Brad Pitt", "Tom Cruise", "Johnny Depp"], choicesEn:["Brad Pitt", "Tom Cruise", "Johnny Depp"], image:"12.jpeg", answer: "Brad Pitt",answerEn: "Brad Pitt"},
    { number:62, type: "visual",question: "Mission Impossible", questionEn:"Mission: Impossible",choices: ["Tom Cruise", "Will Smith", "Matt Damon"], choicesEn:["Tom Cruise", "Will Smith", "Matt Damon"], image:"13.jpeg", answer: "Tom Cruise" ,answerEn: "Tom Cruise"},
    { number:63, type: "visual",question: "Pirates des Caraïbes", questionEn:"Pirates of the Caribbean",choices: ["Johnny Depp", "Orlando Bloom", "Leonardo DiCaprio"], choicesEn:["Johnny Depp", "Orlando Bloom", "Leonardo DiCaprio"], image:"14.jpeg", answer: "Johnny Depp",answerEn: "Johnny Depp" },
    { number:64, type: "visual", question: "Chanteuse américaine célèbre", questionEn:"Famous American singer",choices: ["Beyoncé", "Rihanna", "Ariana Grande"], choicesEn:["Beyoncé", "Rihanna", "Ariana Grande"], image:"15.jpeg", answer: "Beyoncé",answerEn: "Beyoncé" },

    { number:65, type: "visual",question: "Chanteuse Diamonds", questionEn:"Singer Diamonds",choices: ["Rihanna", "Beyoncé", "Shakira"], choicesEn:["Rihanna", "Beyoncé", "Shakira"], image:"16.jpeg", answer: "Rihanna",answerEn: "Rihanna"},
    { number:66, type: "visual",question: "Star du football français", questionEn:"French soccer star",choices: ["Mbappé", "Griezmann", "Benzema"], choicesEn:["Mbappé", "Griezmann", "Benzema"], image:"17.jpeg", answer: "Mbappé",answerEn: "Mbappé" },
    { number:67, type: "visual",question: "Footballeur argentin légendaire", questionEn:"Legendary Argentine soccer player",choices: ["Messi", "Ronaldo", "Neymar"], choicesEn:["Messi", "Ronaldo", "Neymar"], image:"18.jpeg", answer: "Messi",answerEn: "Messi" },
    { number:68, type: "visual",question: "Fondateur de Facebook", questionEn:"Founder of Facebook",choices: ["Mark Zuckerberg", "Elon Musk", "Jeff Bezos"], choicesEn:["Mark Zuckerberg", "Elon Musk", "Jeff Bezos"], image:"19.jpeg", answer: "Mark Zuckerberg",answerEn: "Mark Zuckerberg" },
    { number:69, type: "visual", question: "Scientifique gravité", questionEn:"Gravity scientist",choices: ["Isaac Newton", "Einstein", "Galilée"], choicesEn:["Isaac Newton", "Einstein", "Galilée"], image:"20.jpeg", answer: "Isaac Newton",answerEn: "Isaac Newton" },

    { number:70, type: "visual",question: "Joueuse de tennis légendaire", questionEn:"Legendary tennis player",choices: ["Serena Williams", "Naomi Osaka", "Simona Halep"], choicesEn:["Serena Williams", "Naomi Osaka", "Simona Halep"], image:"21.jpeg", answer: "Serena Williams",answerEn: "Serena Williams"},
    { number:71, type: "visual",question: "Acteur de Matrix", questionEn:"Actor in Matrix",choices: ["Keanu Reeves", "Brad Pitt", "Tom Cruise"], choicesEn:["Keanu Reeves", "Brad Pitt", "Tom Cruise"], image:"22.jpeg", answer: "Keanu Reeves",answerEn: "Keanu Reeves" },
    { number:72, type: "visual",question: "Leader historique d'Afrique du Sud", questionEn:"Longtime leader of South Africa",choices: ["Nelson Mandela", "Martin Luther King", "Barack Obama"], choicesEn:["Nelson Mandela", "Martin Luther King", "Barack Obama"], image:"23.jpeg", answer: "Nelson Mandela",answerEn: "Nelson Mandela" },
    { number:73, type: "visual",question: "Acteur légendaire français", questionEn:"Legendary French actor",choices: ["Jean Gabin", "Bourvil", "Lino Ventura"], choicesEn:["Jean Gabin", "Bourvil", "Lino Ventura"], image:"24.jpeg", answer: "Jean Gabin", answerEn: "Jean Gabin" },
    { number:74, type: "visual", question: "Acteur légendaire français", questionEn:"Legendary French actor",choices: ["Lino Ventura", "Jean Gabin", "Louis de Funès"], choicesEn:["Lino Ventura", "Jean Gabin", "Louis de Funès"], image:"25.jpeg", answer: "Lino Ventura",  answerEn: "Lino Ventura" },

  ];

  numbertimesplayed = 0;
  showEnd = false;
  joinus = "";
  endgaming = "";
  finalText = "";
  okText = "OK";
  bestScore = 0;
  bestScoreText = "";

  source = "quickbrain";

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
    
    this.checkLocaleStorage();
    if(this.numbertimesplayed == 3){
      this.finalText = this.bestScoreText + " Score : " + this.localStorageService.getBestScoreExercicePlayed("quickbrainscore");
      this.showEnd = true;
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
          'easy',
          'medium',
          'hard',
          'join',
          'endgaming',
          'highest'
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
        this.easy = translations['easy'];
        this.medium = translations['medium'];
        this.hard = translations['hard'];
        this.joinus = translations['join'];
        this.endgaming = translations['endgaming'];
        this.bestScoreText = translations['highest'];
      });
    }
    this.changeLanguageQuestionsIfStart();
  }

  setSourcePage(){
    this.localStorageService.setSourcePage(this.source);
  }

  checkLocaleStorage(){
    let times = this.localStorageService.getNumberExercicePlayed("quickbrain");
    if(times != null){
        this.numbertimesplayed = Number(times);
    }
  }

  checkBestScore(){
    let score = this.localStorageService.getBestScoreExercicePlayed("quickbrainscore");
    if(score == null || score == undefined){
      this.localStorageService.setBestScoreExercicePlayed("quickbrainscore",this.bestScore);
    }
    else if(score != null || score != undefined){
      if( this.bestScore > Number(score)){
         this.localStorageService.setBestScoreExercicePlayed("quickbrainscore",this.bestScore);
      }  
    }
  }

  changeLanguageQuestionsIfStart(){
    let lang = localStorage.getItem("language");
    if (lang == null){
      this.language = "fr";
    }
    else{
      this.language = lang;
    }
    if(this.start && this.startChooseLevel){
      if(this.language == 'fr'){
        this.message = this.questionAsk.question;
      }
      else{
        this.message = this.questionAsk.questionEn;
      }
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

  setTimesPlayed(){
    this.numbertimesplayed++;
    this.localStorageService.setNumberExercicePlayed("quickbrain", this.numbertimesplayed);
    console.log("localStorageService quickbrain = "+this.localStorageService.getNumberExercicePlayed("quickbrain"));
  }

  startGame() {
    this.checkLocaleStorage();
    if(this.numbertimesplayed == 3){
      this.finalText = this.bestScoreText + " Score : " + this.localStorageService.getBestScoreExercicePlayed("quickbrainscore");
      this.showEnd = true;
    }
    else{
      this.start = true;
      this.message = this.message1;
      this.score = 0;
    }
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
      this.message =  this.questionAsk.questionEn;
    }

    var m = this.questionAsk.choices.length, t, i;

    while (m) {    
      i = Math.floor(Math.random() * m--);
      if(this.language == 'fr'){
         t = this.questionAsk.choices[m];
         this.questionAsk.choices[m] = this.questionAsk.choices[i];
      }
      else{
         t = this.questionAsk.choicesEn[m];
         this.questionAsk.choices[m] = this.questionAsk.choicesEn[i];
      }
     
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

  setOrNotSetBestScore(){
    if(this.score >= this.bestScore){
        this.bestScore = this.score;
        this.checkBestScore();
    }
  }

  end(message:string){
    this.setTimesPlayed();
    this.setOrNotSetBestScore();
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
    let compare = "";
    if(this.language == 'fr'){
      compare = this.questionAsk.answer
    }
    else{
      compare = this.questionAsk.answerEn;
    }
    
    if(compare == response){
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
    clearInterval(this.timerInterval);

    setTimeout(() => {
      if(!this.win){
        this.end(this.messageWrong);
      }
    }, 1000);
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

  join(){
    this.showEnd = false;
    this.appComponent.scrollToFooterElement();
  }

  quit(){
    this.router.navigate(["exercices"]);
  }
}
