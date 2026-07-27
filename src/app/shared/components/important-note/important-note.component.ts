import { Component, ElementRef, OnInit } from '@angular/core';
import { TranslateappService } from '../../../services/translateapp.service';

@Component({
  selector: 'app-important-note',
  standalone: false,
  templateUrl: './important-note.component.html',
  styleUrl: './important-note.component.scss'
})
export class ImportantNoteComponent  implements OnInit{
  noteTitle ="";
  noteDescription ="";
  noteElements = "";

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
          'pages.journal.dashboard.important-note.noteTitle',
          'pages.journal.dashboard.important-note.noteDescription',
          'pages.journal.dashboard.important-note.noteElements',
        ]
      )
      .subscribe(translations => {
        this.noteTitle = translations['pages.journal.dashboard.important-note.noteTitle'];
        this.noteDescription = translations['pages.journal.dashboard.important-note.noteDescription'];
        this.noteElements = translations['pages.journal.dashboard.important-note.noteElements'];
      });
    }
  }
}
