import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-report-stat-card',
  standalone: false,
  templateUrl: './report-stat-card.component.html',
  styleUrl: './report-stat-card.component.scss'
})
export class ReportStatCardComponent {
  @Input() icon = '';

  @Input() color = '';

  @Input() value = '';

  @Input() label = '';

  @Input() trend = '';

  @Input() trendLabel = '';
}
