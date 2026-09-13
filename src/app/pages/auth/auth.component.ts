import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import {
    AuthService
} from '../../services/auth.service';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-auth',
  standalone: false,
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {

    mode: 'login' | 'register' = 'login';

    selectedRole: 'patient' | 'neurologue' = 'patient';

    loginData = {
        email: '',
        password: ''
    };

    registerData  = {
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        password: '',
        role: 'patient',
        rpps: ''
    };

    confirmPassword = '';

    rememberMe = false;

    loading = false;

    errorMessage = '';
    successMessage = '';

    constructor(
        private authService: AuthService,
        private router: Router,
        public appComponent: AppComponent
    ) {}

    ngOnInit(): void {
        console.log('AuthComponent initialized');
        this.appComponent.setHome(false);
        this.appComponent.setLanding(true);
        this.appComponent.setStartGame(true);
        const url = window.location.pathname;

        if (url.includes('register')) {
            this.mode = 'register';
        }
        if (url.includes('login')) {
            this.mode = 'login';
        }
        console.log('Current URL:', url);
        console.log('Mode:', this.mode);
        if (url.includes('patient')) {
            this.selectRole('patient');
        }
        if (url.includes('neurologue')) {
            this.selectRole('neurologue');
        }
    }

    showLogin(): void {

        this.mode = 'login';

        this.errorMessage = '';
        this.successMessage = '';
    }

    showRegister(): void {

        this.mode = 'register';

        this.errorMessage = '';
        this.successMessage = '';
    }

    selectRole(role: 'patient' | 'neurologue'): void {

        this.selectedRole = role;

        this.registerData.role = role;
    }

    login(): void {

        /*this.errorMessage = '';
        this.successMessage = '';

        if (!this.loginData.email || !this.loginData.password) {

            this.errorMessage =
                'Veuillez renseigner votre adresse e-mail et votre mot de passe.';

            return;
        }

        this.loading = true;

        this.authService.login(this.loginData)
            .subscribe({
              next: response => {

                    this.loading = false;

                    if (!response.success || !response.user) {

                        this.errorMessage =
                            response.message ||
                            'Adresse e-mail ou mot de passe incorrect.';

                        return;
                    }

                    // Le cookie de session a été créé par le serveur.

                    if (response.user.role === 'patient') {

                        this.router.navigate(['/dashboard']);

                    } else if (response.user.role === 'neurologue') {

                        this.router.navigate(['/neurologue']);
                    
                    }

                },

                error: error => {

                    this.loading = false;

                    if (error.status === 401) {

                        this.errorMessage =
                    'Adresse e-mail ou mot de passe incorrect.';

                    } else {

                        this.errorMessage =
                            'Impossible de contacter le serveur.';

                    }

                }

            });*/

    }

    register(): void {

        /*this.errorMessage = '';
        this.successMessage = '';

        if (
            !this.registerData.firstName ||
            !this.registerData.lastName ||
            !this.registerData.email ||
            !this.registerData.password
        ) {

            this.errorMessage =
                'Veuillez remplir tous les champs obligatoires.';

            return;
        }

        if (this.registerData.role === 'patient' &&
            !this.registerData.birthDate) {

            this.errorMessage =
                'Votre date de naissance est nécessaire pour personnaliser votre espace.';

            return;
        }

        if (this.registerData.password !== this.confirmPassword) {

            this.errorMessage =
                'Les mots de passe ne correspondent pas.';

            return;
        }

        if (this.registerData.password.length < 8) {

            this.errorMessage =
                'Le mot de passe doit contenir au moins 8 caractères.';

            return;
        }

        this.loading = true;

        this.authService.register(this.registerData)
            .subscribe({

                next: response => {

                    this.loading = false;

                    if (!response.success) {

                        this.errorMessage =
                            response.message ||
                            'Impossible de créer votre compte.';

                        return;
                    }

                    this.successMessage =
                        'Votre compte a été créé. Vous pouvez maintenant vous connecter.';

                    this.mode = 'login';

                    this.loginData.email =
                        this.registerData.email;

                    this.loginData.password = '';

                    this.registerData = {
                        firstName: '',
                        lastName: '',
                        email: '',
                        birthDate: '',
                        password: '',
                        role: 'patient'
                    };

                    this.confirmPassword = '';

                },

                error: error => {

                    this.loading = false;

                    if (error.status === 409) {

                        this.errorMessage =
                            'Cette adresse e-mail est déjà utilisée.';

                    } else {

                        this.errorMessage =
                            'Une erreur est survenue lors de la création du compte.';

                    }

                }

            });*/

    }
}
