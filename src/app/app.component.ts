import { Component, ElementRef, ViewChild } from '@angular/core';
import { HeaderComponent } from './shared/header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss',
})

export class AppComponent {
  title = 'epileptomemo';
  sidebarActive = false;
  home = true;

  @ViewChild('footerElement') footerElement!: ElementRef;
  @ViewChild('headerCmp') headerComponent!:HeaderComponent;
  
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

  changeTitleMobileHeader(){
    if (this.headerComponent != null) {
      this.headerComponent.setTitleHeader();
    }
  }
}
