import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-confidentialite',
  standalone: false,
  templateUrl: './confidentialite.component.html',
  styleUrl: '../styles/legal-pages.scss'
})
export class ConfidentialiteComponent implements OnInit {
  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

}
