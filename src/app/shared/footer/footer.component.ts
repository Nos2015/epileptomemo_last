import { Component, ElementRef, OnInit } from '@angular/core';
import { TranslateappService } from '../../services/translateapp.service';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{

  titleFooter = "";
  subTitleFooter = "";
  enterEmail = "";
  joinWaitList = "";
  currentlyDev = "";

  constructor(
      public translate: TranslateappService,
      private elementRef: ElementRef,
  ){

  }

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
          'footer.title',
          'footer.subTitle',
          'enterEmail',
          'joinWaitList',
          'currentlyDev'
        ]
      )
      .subscribe(translations => {
        this.titleFooter = translations['footer.title'];
        this.subTitleFooter = translations['footer.subTitle'];
        this.enterEmail = translations['enterEmail'];
        this.joinWaitList = translations['joinWaitList'];
        this.currentlyDev = translations['currentlyDev'];
      });
    }
  }

}
