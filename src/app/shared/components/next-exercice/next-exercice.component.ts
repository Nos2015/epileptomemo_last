import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateappService } from '../../../services/translateapp.service';

@Component({
  selector: 'app-next-exercice',
  standalone: false,
  templateUrl: './next-exercice.component.html',
  styleUrl: './next-exercice.component.scss'
})

export class NextExerciceComponent implements OnInit{
    @Input() icon = '';
    @Input() iconSecond = '';
    @Input() iconSecondHover = '';
    currentUrl = '';
    pathIconSecond='';
    pathIconSecondHover='';
    nextStape = "";
    nextStapeMessage = "";
    nextStapeSubtitleMessage = "";
    seeStatistics = "";

    constructor(
              private router: Router,
              public translate: TranslateappService,
              private elementRef: ElementRef,
    ){}

    ngOnInit(): void {
      this.currentUrl = this.router.url;
      if(this.iconSecond!=''){
        this.pathIconSecond = this.currentUrl+"/assets/"+this.iconSecond+".png";
      }
      if(this.iconSecondHover!=''){
        this.pathIconSecondHover = this.currentUrl+"/assets/"+this.iconSecondHover+".png";
      }

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
          'pages.journal.dashboard.next-exercice.nextStape',
          'pages.journal.dashboard.next-exercice.nextStapeMessage',
          'pages.journal.dashboard.next-exercice.nextStapeSubtitleMessage',
          'pages.journal.dashboard.next-exercice.seeStatistics'
        ]
      )
      .subscribe(translations => {
        this.nextStape = translations['pages.journal.dashboard.next-exercice.nextStape'];
        this.nextStapeMessage = translations['pages.journal.dashboard.next-exercice.nextStapeMessage'];
        this.nextStapeSubtitleMessage = translations['pages.journal.dashboard.next-exercice.nextStapeSubtitleMessage'];
        this.seeStatistics = translations['pages.journal.dashboard.next-exercice.seeStatistics'];
      });

    }
  }
}
