import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  standalone: false,
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.scss'
})
export class PopupComponent {
  @Input("titleContent")titleContent :string= "";
  @Input("content")content:string = "";
  @Input("titleButton1")titleButton1:string = "";
  @Input("titleButton2")titleButton2:string = "";

  @Output("parentFirstMethod") parentFirstMethod: EventEmitter<any> = new EventEmitter();
  @Output("parentSecondMethod") parentSecondMethod: EventEmitter<any> = new EventEmitter();

  methodPopup1(){
    this.parentFirstMethod.emit();
  }

  methodPopup2(){
    this.parentSecondMethod.emit();
  }

  setTitleContent(title:string){
    this.titleContent = title;
  }

  setContent(content:string){
    this.content;
  }

  setTitleButton1(titlebutton:string){
    this.titleButton1 = titlebutton;
  }

  setTitleButton2(titlebutton:string){
    this.titleButton2 = titlebutton;
  }
}
