import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { TranslateappService } from '../../../services/translateapp.service';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../../services/localstorage.service';

@Component({
  selector: 'app-memorysequence',
  standalone: false,
  templateUrl: './memorysequence.component.html',
  styleUrl: './memorysequence.component.scss'
})

export class MemorysequenceComponent implements OnInit{

  title = "";
  subTitle = "";
  explaination = "";
  green = "";
  red = "";
  blue = "";
  yellow = "";
  addColor=false;

  colors = ["green","red","blue","yellow"];
  sequence:string[] = [];
  playerSequence:string[] = [];
  level = 3;
  playing = false;
  message = "";
  score = 0;
  start = false;
  win = false;

  messagePopup="";
  firstPopup= true;
  secondPopup = false
  showPopup = false;
  message1 = "";
  message1new = "";
  message2 = "";
  messageWrong = "";
  messageSuccess = "";

  numbertimesplayed = 0;
  showEnd = false;
  joinus = "";
  endgaming = "";
  finalText = "";
  okText = "OK";
  bestScore = 0;
  bestScoreText = "";

  source = "memorysequence";

  @ViewChild('game') gameElement!: ElementRef;

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
      this.finalText = this.bestScoreText + " Score : " + this.localStorageService.getBestScoreExercicePlayed("memorysequencescore");
      this.showEnd = true;
    }
  }

  setSourcePage(){
    this.localStorageService.setSourcePage(this.source);
  }

  checkLocaleStorage(){
    let times = this.localStorageService.getNumberExercicePlayed("memorysequence");
    if(times != null){
        this.numbertimesplayed = Number(times);
    }
  }

  checkBestScore(){
    let score = this.localStorageService.getBestScoreExercicePlayed("memorysequencescore");
    if(score == null || score == undefined){
      this.localStorageService.setBestScoreExercicePlayed("memorysequencescore",this.bestScore);
    }
    else if(score != null || score != undefined){
      if( this.bestScore > Number(score)){
         this.localStorageService.setBestScoreExercicePlayed("memorysequencescore",this.bestScore);
      }  
    }
  }

  changeLanguage(){
    //changeLanguage when page is on front
    if(this.elementRef.nativeElement.offsetParent != null) {
      this.translate.translate.get(
        [
          'pages.exercices.games.1.title',
          'pages.exercices.games.1.subtitle',
          'pages.exercices.games.1.explanations',
          'pages.exercices.games.1.message1',
          'pages.exercices.games.1.message1new',
          'pages.exercices.games.1.message2',
          'pages.exercices.games.1.messageWrong',
          'pages.exercices.games.1.messageSuccess',
          'green',
          'red',
          'blue',
          'yellow',
          'join',
          'endgaming',
          'highest'
        ]
      )
      .subscribe(translations => {
        this.title = translations['pages.exercices.games.1.title'];
        this.subTitle = translations['pages.exercices.games.1.subtitle'];
        this.explaination = translations['pages.exercices.games.1.explanations'];
        this.green = translations['green'];
        this.blue = translations['blue'];
        this.red = translations['red'];
        this.yellow = translations['yellow'];
        this.colors = [translations['green'], translations['blue'], translations['red'], translations['yellow']];
        this.message1 = translations['pages.exercices.games.1.message1'];
        this.message1new = translations['pages.exercices.games.1.message1new'];
        this.message2 = translations['pages.exercices.games.1.message2'];
        this.messageWrong = translations['pages.exercices.games.1.messageWrong'];
        this.messageSuccess = translations['pages.exercices.games.1.messageSuccess'];
        this.joinus = translations['join'];
        this.endgaming = translations['endgaming'];
        this.bestScoreText = translations['highest'];
      });
    }
  }

  addButtonClass(type:string){
    let css = 'button-width50';
    if(type == 'buttons'){
      css += ' nobackground';
    }

    if(!this.start){
      return css;
    }
    else{
      css += ' grey';
      return css;
    }
    
  }

  addClass(color:string){
    if(this.start && this.addColor){
        return 'color '+color;
    }
    else {
      return 'color grey';
    }
  }

  launchGame(){
    this.showPopup =false;
    if(this.firstPopup){
      this.firstPopup = false;
      for(let i=0;i<this.level;i++){
          const random = this.colors[Math.floor(Math.random()*this.colors.length)];
          this.sequence.push(random);
      }

      this.showSequence();
    }
    else if(this.secondPopup){
      this.secondPopup = false;
      this.addColor = true;
    }
  }

  newOrEndGame(){
    if(!this.win){
      this.score = 0;
    }
    this.scrollToGameElement();
    this.sequence = [];
    this.playerSequence = [];
    if(this.score == 0  || this.score < 0){
      this.messagePopup = this.message1;
    }
    else{
      this.messagePopup = this.message1new;
    }
    this.showPopup = true;
    this.firstPopup = true;
  }

  startGame(){
    this.checkLocaleStorage();
    this.start = true;
    if(this.numbertimesplayed == 3){
      this.finalText = this.bestScoreText + " Score : " + this.localStorageService.getBestScoreExercicePlayed("memorysequencescore");
      this.showEnd = true;
    }
    else{
      this.newOrEndGame();
    }
    
  }

  async showSequence(){
    await this.sleep(1000);
    this.playing = false;

    for( let i=0;i<this.sequence.length;i++){
      this.message = this.sequence[i];
      await this.sleep(1000);
      this.message = '';
      await this.sleep(500);
    }

    this.messagePopup = this.message2;
    this.secondPopup = true;
    this.showPopup = true;
    await this.sleep(1000);
    this.message = '';
    this.playing = true;
  }

  setOrNotSetBestScore(){
    if(this.score >= this.bestScore){
        this.bestScore = this.score;
        this.checkBestScore();
    }
  }

  selectColor(color:string){
    if(!this.playing) return;
    this.playerSequence.push(color);

    if(this.playerSequence[this.playerSequence.length -1] !== this.sequence[this.playerSequence.length -1]){
      this.setTimesPlayed();
      this.message = this.messageWrong;
      this.playing = false;
      this.start = false;
      this.addColor = false;
      this.level = 3;
      this.win = false;
      this.setOrNotSetBestScore();
      if(!this.checkUserCanPlay()){
        this.finalText = this.bestScoreText + " Score : " + this.localStorageService.getBestScoreExercicePlayed("memorysequencescore");
        this.showEnd = true;
      }
      return;
    }

    if(this.playerSequence.length == this.sequence.length){
      this.addColor = false;
      this.message = this.messageSuccess;
      this.level++;
      this.score++;
      this.setOrNotSetBestScore();
      this.win = true;
      setTimeout(() => this.startGame(), 1000);
    }
  }

  sleep(ms:number){
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  scrollToGameElement(){
    if (this.gameElement != null) {
      let el = this.gameElement.nativeElement as HTMLElement
      el.scrollIntoView();
    }
  }

  getTimesPlayed(){
    return this.numbertimesplayed;
  }

  setTimesPlayed(){
    this.numbertimesplayed++;
    this.localStorageService.setNumberExercicePlayed("memorysequence", this.numbertimesplayed);
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