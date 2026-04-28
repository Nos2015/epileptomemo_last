import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

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
