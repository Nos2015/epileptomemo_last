import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateappService } from '../../../services/translateapp.service';

@Component({
  selector: 'app-medication-history',
  standalone: false,
  templateUrl: './medication-history.component.html',
  styleUrl: './medication-history.component.scss'
})
export class MedicationHistoryComponent implements OnInit{

  latestInTake = "";
  seeEverything = "";
  historyToSee: { date: string; name: string; dose: string }[] = [];

  history = [
    {
    date:"Aujourd'hui 08:15",
    name:"Lévétiracétam",
    dose:"1000 mg"
    },
    {
    date:"Aujourd'hui 20:12",
    name:"Lévétiracétam",
    dose:"1000 mg"
    },
    {
    date:"Hier 08:10",
    name:"Lévétiracétam",
    dose:"1000 mg"
    },
    {
    date:"Hier 20:05",
    name:"Lévétiracétam",
    dose:"1000 mg"
    }
  ];

  historyEn = [
    {
    date:"Today 08:15",
    name:"Lévétiracétam",
    dose:"1000 mg"
    },
    {
    date:"Today 20:12",
    name:"Lévétiracétam",
    dose:"1000 mg"
    },
    {
    date:"Yesterday 08:10",
    name:"Lévétiracétam",
    dose:"1000 mg"
    },
    {
    date:"Yestarday 20:05",
    name:"Lévétiracétam",
    dose:"1000 mg"
    }
  ];

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
          'pages.journal.dashboard.latest-medication.latestInTake',
          'seeEverything'
        ]
      )
      .subscribe(translations => {
        this.latestInTake = translations['pages.journal.dashboard.latest-medication.latestInTake'];
        this.seeEverything = translations['seeEverything'];
      });
    }
    if(this.translate.getLanguageUsed() == "fr"){
      this.historyToSee = this.history;
    }
    else{
      this.historyToSee = this.historyEn;
    }
  }
}
