import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Crisis {

  date: string;
  hour: string;

  title: string;

  duration: string;
  recovery: string;

  icon: string;

  color: string;

  tags: string[];

}

@Component({
  selector: 'app-crisistimeline',
  standalone: false,
  templateUrl: './crisistimeline.component.html',
  styleUrl: './crisistimeline.component.scss'
})

export class CrisistimelineComponent {

  expandedIndex: number | null = null;
  crises: Crisis[] = [

    {
      date: "Aujourd'hui",
      hour: "14:32",
      title: "Crise focale",
      duration: "45 s",
      recovery: "15 min",
      icon: "focalecrisis.png",
      color: "blue",
      tags: ["Stress", "Fatigue"]
    },
    {
      date: "12 juillet",
      hour: "08:10",
      title: "Crise d'absence",
      duration: "20 s",
      recovery: "5 min",
      icon: "absencecrisis.png",
      color: "green",
      tags: ["Manque de sommeil"]
    },
    {
      date: "8 juillet",
      hour: "19:52",
      title: "Crise généralisée",
      duration: "2 min 15",
      recovery: "1 h 20",
      icon: "generalcrisis.png",
      color: "purple",
      tags: ["Stress"]
    }
  ];

  toggle(index: number): void {
    if (this.expandedIndex === index) {
      this.expandedIndex = null;
    } else {
      this.expandedIndex = index;
    }
  }
}
