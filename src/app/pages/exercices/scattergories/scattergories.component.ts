import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { TranslateappService } from '../../../services/translateapp.service';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../services/localstorage.service';

@Component({
  selector: 'app-scattergories',
  standalone: false,
  templateUrl: './scattergories.component.html',
  styleUrl: './scattergories.component.scss'
})

export class ScattergoriesComponent implements OnInit{
  title = "";
  subTitle = "";
  explaination = "";
  selectedLetter = '';
  endingWord = '';
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
  showEnd = false;
  total = 5;

  validate = "";
  startover = "";
  exit = "";
  answer = "";

  WORDS =[
    {
      letter:"A",
      play:false
    },
    {
      letter:"B",
      play:false
    },
    {
      letter:"C",
      play:true,
      ending: "EAU",
      values: [
      { definition: "Partie du corps pour penser", answer: "cerveau" },
      { definition: "Élément d’une fenêtre", answer: "carreau" },
      { definition: "Grande maison", answer: "château" },
      { definition: "Conduit pour l’eau", answer: "caniveau" },
      { definition: "Jeune bovin", answer: "veau" }
      ]
    },
    {
      letter:"D",
      play:false
    },
    {
      letter:"E",
      play:false
    },
    {
      letter:"F",
      play:false
    },
    {
      letter:"G",
      play:false
    },
    {
      letter:"H",
      play:false
    },
    {
      letter:"I",
      play:false
    },
    {
      letter:"J",
      play:false
    },
    {
      letter:"K",
      play:false
    },
    {
      letter:"L",
      play:false
    },
    {
      letter:"M",
      play:true,
      ending: "EUR",
      values: [
      { definition: "Celui qui mange", answer: "mangeur" },
      { definition: "Celui qui marche", answer: "marcheur" },
      { definition: "Celui qui mesure", answer: "mesureur" },
      { definition: "Celui qui monte", answer: "monteur" },
      { definition: "Appareil de cuisine", answer: "mixeur" }
      ]
    },
    {
      letter:"N",
      play:false
    },
    {
      letter:"O",
      play:false
    },
    {
      letter:"P",
      play:true,
      ending: "ION",
      values: [
      { definition: "Action de produire", answer: "production" },
      { definition: "Action de protéger", answer: "protection" },
      { definition: "Action de préparer", answer: "préparation" },
      { definition: "Action de proposer", answer: "proposition" },
      { definition: "Action de publier", answer: "publication" }
      ]
    },
    {
      letter:"Q",
      play:false
    },
    {
      letter:"R",
      play:false
    },
    {
      letter:"S",
      play:false
    },
    {
      letter:"T",
      play:true,
      ending: "EUR",
      values: [
      { definition: "Celui qui travaille", answer: "travailleur" },
      { definition: "Celui qui transporte", answer: "transporteur" },
      { definition: "Celui qui trie", answer: "trieur" },
      { definition: "Celui qui tourne", answer: "tourneur" },
      { definition: "Celui qui teste", answer: "testeur" }
      ]
    },
    {
      letter:"U",
      play:false
    },
    {
      letter:"V",
      play:false
    },
    {
      letter:"W",
      play:false
    },
    {
      letter:"X",
      play:false
    },
    {
      letter:"Y",
      play:false
    },
    {
      letter:"Z",
      play:false
    },
  ];

  WORDS_EN = [
    {
      letter:"A",
      play:false
    },
    {
      letter:"B",
      play:false
    },
    {
      letter: "C",
      play:true,
      ending: "AKE",
      values: [
        { definition: "A sweet dessert", answer: "cake" },
        { definition: "A small wading bird of the Rallidae family, closely related to the moorhen", answer: "crake"},
        { definition: "A small individual cake baked in a cup-shaped mold, usually frosted", answer: "cupcake" },
        { definition: "A dessert made with fresh cheese (often cream cheese) on a cookie crust", answer: "cheesecake" },
        { definition: "A piece of toasted corn, typically eaten as breakfast cereal", answer: "cornflake" }
      ]
    },
    {
      letter:"D",
      play:false
    },
    {
      letter:"E",
      play:false
    },
    {
      letter:"F",
      play:false
    },
    {
      letter:"G",
      play:false
    },
    {
      letter:"H",
      play:false
    },
    {
      letter:"I",
      play:false
    },
    {
      letter:"J",
      play:false
    },
    {
      letter:"K",
      play:false
    },
    {
      letter:"L",
      play:false
    },
    {
      letter: "M",
      play:true,
      ending: "AKE",
      values: [
        { definition: "To create something", answer: "make" },
        { definition: "An error made inadvertently or due to a lack of knowledge", answer: "mistake" },
        { definition: "A creamy drink made with milk, ice, and often syrup or fruit, blended", answer: "milkshake" },
        { definition: "A plant with roots that sometimes resemble human forms, historically used in magic and traditional medicine", answer: "mandrake" },
        { definition: "Dig into scandals or shady dealings, particularly in investigative journalism", answer: "muckrake" }
      ]
    },
    {
      letter:"N",
      play:false
    },
    {
      letter:"O",
      play:false
    },
    {
      letter: "P",
      play:true,
      ending: "P",
      values: [
        { definition: "A quick, sharp sound, like a small explosion; also slang for a fizzy soft drink, or a term for 'father'", answer: "pop" },
        { definition: "A young dog. It can also refer to the young of certain other animals like seals", answer: "pup" },
        { definition: "A small seed found in fruits like apples or oranges or also a short beeping sound, like the time signal on the radio", answer: "pip" },
        { definition: "Short for 'preparation'. The act of getting something ready, or (informally) a student at a preparatory school", answer: "prep" },
        { definition: "Having a full, rounded shape. Somewhat fat in a pleasant or attractive way", answer: "plump" }
      ]
    },
    {
      letter:"Q",
      play:false
    },
    {
      letter:"R",
      play:false
    },
    {
      letter:"S",
      play:false
    },
    {
      letter: "T",
      play:true,
      ending: "TE",
      values: [
        { definition: "Having died after making a valid legal will", answer: "testate" },
        { definition: "To bring something to an end. To stop or conclude a process, contract, or action", answer: "terminate" },
        { definition: "To cover a surface with repeated shapes (tiles) that fit together without gaps or overlaps", answer: " tessellate" },
        { definition: "Mild or moderate, especially referring to climate, behavior, or the avoidance of extremes", answer: "temperate" },
        { definition: "To convert words or text from one language into another while preserving the meaning", answer: "translate" }
      ]
    },
    {
      letter:"U",
      play:false
    },
    {
      letter:"V",
      play:false
    },
    {
      letter:"W",
      play:false
    },
    {
      letter:"X",
      play:false
    },
    {
      letter:"Y",
      play:false
    },
    {
      letter:"Z",
      play:false
    },
  ];

  questionsToAnswer:any;
  language = "";

  showNoLetter = false;

  letterFirst = "";

  @ViewChild('game') gameElement!: ElementRef;

  join = "";
  lettercomingsoon = "";

  indexInWords = 0;
  numbertimesplayed = 0;
  finalText = "";
  endgaming = "";
  finalPlayedText = "";
  joinus = "";
  okText = "OK";
  bestScore = 0;
  bestScoreText = "";

  source = "scattergories";
  dontforget = "";

  constructor(public appComponent: AppComponent,
                  public translate: TranslateappService,
                  private elementRef: ElementRef,
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
      
      this.checkLocaleStorage();
      if(this.numbertimesplayed == 3){
        this.finalPlayedText = this.bestScoreText + " Score max : " + this.localStorageService.getBestScoreExercicePlayed("scattergoriesscore") + " / " + this.total;
        this.showEnd = true;
      }
  }

  setSourcePage(){
    this.localStorageService.setSourcePage(this.source);
  }
  
  setOrNotSetBestScore(){
    if(this.score >= this.bestScore){
        this.bestScore = this.score;
        this.checkBestScore();
    }
  }

  checkLocaleStorage(){
    let times = this.localStorageService.getNumberExercicePlayed("scattergories");
    if(times != null){
        this.numbertimesplayed = Number(times);
    }
  }

  checkBestScore(){
    let score = this.localStorageService.getBestScoreExercicePlayed("scattergoriesscore");
    if(score == null || score == undefined){
      this.localStorageService.setBestScoreExercicePlayed("scattergoriesscore",this.bestScore);
    }
    else if(score != null || score != undefined){
      if( this.bestScore > Number(score)){
         this.localStorageService.setBestScoreExercicePlayed("scattergoriesscore",this.bestScore);
      }  
    }
  }

  changeLanguage(){
    //changeLanguage when page is on front
    console.log("changeLanguage in scattergories");
    if(this.elementRef.nativeElement.offsetParent != null) {
      console.log("changeLanguage in scattergories offset parent not null");
      this.translate.translate.get(
        [
          'pages.exercices.games.7.title',
          'pages.exercices.games.7.subtitle',
          'pages.exercices.games.7.explanations',
          'pages.exercices.games.7.message2',
          'pages.exercices.games.7.victory',
          'pages.exercices.games.7.loose',
          'validate',
          'startover',
          'exit',
          'pages.exercices.games.7.answer',
          'join',
          'endgaming',
          'pages.exercices.games.7.lettercomingsoon',
          'pages.exercices.games.7.dontforget'
        ]
      )
      .subscribe(translations => {
        this.title = translations['pages.exercices.games.7.title'];
        this.subTitle = translations['pages.exercices.games.7.subtitle'];
        this.explaination = translations['pages.exercices.games.7.explanations'];
        this.message2 = translations['pages.exercices.games.7.message2'];
        this.victoryText = translations['pages.exercices.games.7.victory'];
        this.looseText = translations['pages.exercices.games.7.loose'];
        this.validate = translations['validate'];
        this.startover = translations['startover'];
        this.exit = translations['exit'];
        this.answer = translations['pages.exercices.games.7.answer'];
        this.join = translations['join'];
        this.endgaming = translations['endgaming'];
        this.lettercomingsoon = translations['pages.exercices.games.7.lettercomingsoon'];
        this.dontforget = "⚠️  " + translations['pages.exercices.games.7.dontforget'] + " ⚠️" ;
      });
      
      let lang = localStorage.getItem("language");
      if (lang == null || lang == "fr"){
        this.language = "fr";
        this.questionsToAnswer = this.WORDS;
      }
      else{
        this.language = lang;
        this.questionsToAnswer = this.WORDS_EN;
      }

      if(this.selectedLetter != ""){
        this.initializeQuestions(this.selectedLetter);
      }

      if(this.WORDS[this.indexInWords].play || this.WORDS_EN[this.indexInWords].play){
        console.log("setLettersVisible in changeLanguage");
        this.setLettersVisible();
      }
    }
  }

  initializeQuestions(letter:string){
      for (const questions of this.questionsToAnswer) {
        if(letter == questions.letter){
          this.words = questions.values;
        }
      }
  }

  scrollToGameElement(){
    if (this.gameElement != null) {
      let el = this.gameElement.nativeElement as HTMLElement
      el.scrollIntoView();
    }
  }

  selectLetter(letter: string, index:number) {
    this.checkLocaleStorage();
    if(this.numbertimesplayed == 3){
      this.finalPlayedText = this.bestScoreText + " Score max : " + this.localStorageService.getBestScoreExercicePlayed("scattergoriesscore") + " / " + this.total;
      this.showEnd = true;
    }
    else{
      if(this.WORDS[index].play || this.WORDS_EN[index].play){
        this.indexInWords = index;
        this.currentIndex = 0;
        this.selectedLetter = letter;
        this.setLettersVisible();
        this.initializeQuestions(this.selectedLetter);
        this.chooseLetter = true;
        this.scrollToGameElement();
      } 
      else{
        this.showNoLetter = true;
      }
    }
  }
  
  get currentWord() {
    return this.words[this.currentIndex];
  }

  setLettersVisible(){
    console.log("setLettersVisible");
    if(this.language == "fr"){
      console.log("language fr");
      this.letterFirst = this.WORDS[this.indexInWords].letter;
      let letterEnding = this.WORDS[this.indexInWords].ending;
      if(letterEnding != undefined){
        this.endingWord = letterEnding;
      }
    }
    else{
      console.log("language en");
      this.letterFirst = this.WORDS_EN[this.indexInWords].letter;
      let letterEnding = this.WORDS_EN[this.indexInWords].ending;
      console.log("letterEnding : " + letterEnding);
      if(letterEnding != undefined){
        this.endingWord = letterEnding;
        console.log("ending : " + this.endingWord);
      }
    }
  }

  submit() {
    let correct = "";
    
    correct =  this.letterFirst.toLowerCase().trim() + this.userAnswer.toLowerCase().trim() + this.endingWord.toLowerCase().trim();

    if (correct === this.currentWord.answer) {
      this.feedback = "✅ Correct";
      this.streak++;
      this.score++;
    } else {
      if(this.language == "fr"){
        this.feedback = "❌ Mauvaise réponse";
      }
      else{
        this.feedback = "❌ Wrong answer";
      }
      
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
    this.numbertimesplayed++;
    this.localStorageService.setNumberExercicePlayed("scattergories",this.numbertimesplayed);
    this.endOfGame = true;
    this.feedback = null;
    this.streak = 0;
    this.finalText = "Score : "+ this.score + "/" + this.total;
    this.showResult = true;
  }

  restart(){
    window.scroll(0,0);
    this.setOrNotSetBestScore();
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

  joinUs(){
    this.showNoLetter = false;
    this.appComponent.scrollToFooterElement();
  }

  ok(){
    this.showNoLetter = false;
  }
};
