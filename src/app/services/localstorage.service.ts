import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setNumberExercicePlayed(exercice:string, times:number){
    console.log("exercice = "+exercice);
    console.log("times = "+times);
     console.log("times string = "+times.toString());
    localStorage.setItem(exercice,times.toString());
    console.log("getNumberExercicePlayed = "+this.getNumberExercicePlayed("visualpattern"));
  }

  getNumberExercicePlayed(exercice:string):string | null{
    return localStorage.getItem(exercice);
  }
}
