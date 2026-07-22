import { Component, ElementRef, EventEmitter, OnInit, Output } from '@angular/core';
import { AppComponent } from '../../app.component';
import { TranslateappService } from '../../services/translateapp.service';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-games',
  standalone: false,
  templateUrl: './games.component.html',
  styleUrl: './games.component.scss'
})
export class GamesComponent implements OnInit{
  
  @Output() onHide = new EventEmitter<boolean>();
  @Output() onJoinUsExit = new EventEmitter<boolean>();
  
  constructor(public appComponent: AppComponent,
              public translate: TranslateappService,
              private elementRef: ElementRef,
              private router : Router,
              public localStorageService: LocalstorageService
  ){}

  ngOnInit(): void {
    if (navigator.maxTouchPoints > 1) {
      console.log("You are using a Mobile Device");
    }
    else{
      console.log("You are using a Desktop Device");
    }
  }

  exitGame() {
    this.appComponent.setStartGame(false);
    this.setHide();
  }

  joinUs(){
    this.appComponent.setStartGame(false);
    this.onJoinUsExit.emit(false);
  }

  setHide(){
    this.onHide.emit(false);
  }
}
