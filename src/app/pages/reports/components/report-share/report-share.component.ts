import { Component, ElementRef, OnInit } from '@angular/core';
import { TranslateappService } from '../../../../services/translateapp.service';

@Component({
  selector: 'app-report-share',
  standalone: false,
  templateUrl: './report-share.component.html',
  styleUrl: './report-share.component.scss'
})
export class ReportShareComponent implements OnInit{
  shareReport = "";
  neurologue = "";
  send= "";
  byMail = "";
  print = "";
  download = "";

  constructor(
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
          'pages.reports.share.shareReport',
          'pages.reports.share.neurologue',
          'pages.reports.share.send',
          'pages.reports.share.byMail',
          'pages.reports.share.print',
          'pages.reports.share.download'
        ]
      )
      .subscribe(translations => {
        this.shareReport = translations['pages.reports.share.shareReport'];
        this.neurologue = translations['pages.reports.share.neurologue'];
        this.send = translations['pages.reports.share.send'];
        this.byMail = translations['pages.reports.share.byMail'];
        this.print = translations['pages.reports.share.print'];
        this.download = translations['pages.reports.share.download'];
      });
    }
  }
}
