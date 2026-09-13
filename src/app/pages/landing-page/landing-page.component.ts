import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {

  constructor(
        private router: Router,
        public appComponent: AppComponent
    ) {}

    ngOnInit(): void {
      this.appComponent.setHome(false);
      this.appComponent.setLanding(true);
      this.appComponent.setStartGame(true);
    }

    createPatientAccount(): void {
      this.router.navigate(['/auth/register/patient']);
    }

    createProfessionalAccount(): void {
      console.log('Navigating to professional account registration');
      this.router.navigate(['/auth/register/neurologue']);
    }


    login(type: string): void {
      console.log('Login button clicked for type:', type);
      if(type === 'patient') {
        this.router.navigate(['/auth/login/patient']);
      }
      else if(type === 'neurologue') {
        this.router.navigate(['/auth/login/neurologue']);
      }
    }
}
