import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentions-legales',
  standalone: false,
  templateUrl: './mentions-legales.component.html',
  styleUrl: '../styles/legal-pages.scss'
})
export class MentionsLegalesComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }
}
