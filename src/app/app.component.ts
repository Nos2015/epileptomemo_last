import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'epileptomemo';
  sidebarActive = false;
  home = true;

  @ViewChild('footerElement') footerElement!: ElementRef;

  chooseElementOnSideBar($event:boolean){
    this.sidebarActive = $event;
  }

  setHome(value:boolean){
    this.home = value;
  }

  scrollToFooterElement(){
    if (this.footerElement != null) {
      let el = this.footerElement.nativeElement as HTMLElement
      el.scrollIntoView();
    }
  }
}
