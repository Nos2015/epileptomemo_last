import { Component } from '@angular/core';

@Component({
  selector: 'app-medication-history',
  standalone: false,
  templateUrl: './medication-history.component.html',
  styleUrl: './medication-history.component.scss'
})
export class MedicationHistoryComponent {
  history = [
    {
    date:"Aujourd'hui 08:15",
    name:"Lévétiracétam",
    dose:"1000 mg"
    },
    {
    date:"Aujourd'hui 20:12",
    name:"Lévétiracétam",
    dose:"1000 mg"
    },
    {
    date:"Hier 08:10",
    name:"Lévétiracétam",
    dose:"1000 mg"
    },
    {
    date:"Hier 20:05",
    name:"Lévétiracétam",
    dose:"1000 mg"
    }
  ];
}
