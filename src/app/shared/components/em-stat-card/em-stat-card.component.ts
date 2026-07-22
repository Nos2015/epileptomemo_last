import { Component, input, Input, OnInit } from '@angular/core';
import { EmCardComponent } from '../em-card/em-card.component';

@Component({
  selector: 'app-em-stat-card',
  templateUrl: './em-stat-card.component.html',
  styleUrl: './em-stat-card.component.scss',
  standalone: false
})
export class EmStatCardComponent implements OnInit{

  @Input() icon = '';

  @Input() value = '';

  @Input() label = '';

  @Input() footer = '';

  @Input() color = '';

  hasIconFooter = false;

  @Input() iconFooter = '';

  ngOnInit(): void {
    console.log("footer = "+this.footer);
    if(this.footer.includes('+') || this.footer.includes('-')){
      this.hasIconFooter = true;
      if(this.footer.includes('+')){

      }
      else{

      }
    }
  }
}
