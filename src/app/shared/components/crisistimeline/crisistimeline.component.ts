import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TranslateappService } from '../../../services/translateapp.service';

export interface Crisis {

  date: string;
  hour: string;

  title: string;

  duration: string;
  recovery: string;

  icon: string;

  color: string;

  tags: string[];

}

@Component({
  selector: 'app-crisistimeline',
  standalone: false,
  templateUrl: './crisistimeline.component.html',
  styleUrl: './crisistimeline.component.scss'
})

export class CrisistimelineComponent implements OnInit{

  expandedIndex: number | null = null;
  lastCrisis = "";
  seeEverything = "";
  time = "";
  recovery = "";
  crisesToSee: Crisis[] = [];
  crises: Crisis[] = [

    {
      date: "Aujourd'hui",
      hour: "14:32",
      title: "Crise focale",
      duration: "45 s",
      recovery: "15 min",
      icon: "focalecrisis.png",
      color: "blue",
      tags: ["Stress", "Fatigue"]
    },
    {
      date: "12 juillet",
      hour: "08:10",
      title: "Crise d'absence",
      duration: "20 s",
      recovery: "5 min",
      icon: "absencecrisis.png",
      color: "green",
      tags: ["Manque de sommeil"]
    },
    {
      date: "8 juillet",
      hour: "19:52",
      title: "Crise généralisée",
      duration: "2 min 15",
      recovery: "1 h 20",
      icon: "generalcrisis.png",
      color: "purple",
      tags: ["Stress"]
    },
    {
      date: "5 juillet",
      hour: "11:26",
      title: "Crise focale",
      duration: "30 s",
      recovery: "10 min",
      icon: "focalecrisis.png",
      color: "blue",
      tags: ["Oubli de traitement"]
    }
  ];

  crisesEn: Crisis[] = [

    {
      date: "Today",
      hour: "14:32",
      title: "Focal seizure",
      duration: "45 s",
      recovery: "15 min",
      icon: "focalecrisis.png",
      color: "blue",
      tags: ["Stress", "Tired"]
    },
    {
      date: "12 july",
      hour: "08:10",
      title: "Absence Seizure",
      duration: "20 s",
      recovery: "5 min",
      icon: "absencecrisis.png",
      color: "green",
      tags: ["Lack of sleep"]
    },
    {
      date: "8 july",
      hour: "19:52",
      title: "Generalized Seizure",
      duration: "2 min 15",
      recovery: "1 h 20",
      icon: "generalcrisis.png",
      color: "purple",
      tags: ["Stress"]
    },
    {
      date: "5 july",
      hour: "11:26",
      title: "Focal seizure",
      duration: "30 s",
      recovery: "10 min",
      icon: "focalecrisis.png",
      color: "blue",
      tags: ["Missed dose"]
    }
  ];

  toggle(index: number): void {
    if (this.expandedIndex === index) {
      this.expandedIndex = null;
    } else {
      this.expandedIndex = index;
    }
  }

  constructor(
            private router: Router,
            public translate: TranslateappService,
            private elementRef: ElementRef,
  ){}

  ngOnInit(): void {
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
          'pages.journal.dashboard.crisistimeline.lastCrisis',
          'seeEverything',
          'pages.journal.dashboard.crisistimeline.time',
          'pages.journal.dashboard.crisistimeline.recovery',
        ]
      )
      .subscribe(translations => {
        this.lastCrisis = translations['pages.journal.dashboard.crisistimeline.lastCrisis'];
        this.seeEverything = translations['seeEverything'];
        this.time = translations['pages.journal.dashboard.crisistimeline.time'];
        this.recovery = translations['pages.journal.dashboard.crisistimeline.recovery'];
      });
    }
    if(this.translate.getLanguageUsed() == "fr"){
      this.crisesToSee = this.crises;
    }
    else{
      this.crisesToSee = this.crisesEn;
    }
  }
}
