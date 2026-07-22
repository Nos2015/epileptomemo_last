import { Component, Input  } from '@angular/core';

@Component({
  selector: 'app-em-card',
  templateUrl: './em-card.component.html',
  styleUrl: './em-card.component.scss',
  standalone: false
})
export class EmCardComponent {
  @Input() padding = true;
}
