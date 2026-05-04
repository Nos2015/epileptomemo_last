import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setSourcePage(sourcePage:string){
    localStorage.setItem("source", sourcePage);
  }

  getSourcePage(){
    return localStorage.getItem("source");
  }

  setNumberExercicePlayed(exercice:string, times:number){
    localStorage.setItem(exercice,times.toString());
  }

  getNumberExercicePlayed(exercice:string):string | null{
    return localStorage.getItem(exercice);
  }

  setBestScoreExercicePlayed(exerciceScore:string, score:number){
    localStorage.setItem(exerciceScore,score.toString());
  }

  getBestScoreExercicePlayed(exerciceScore:string):string | null{
    return localStorage.getItem(exerciceScore);
  }
}
