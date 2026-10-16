import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppComponent } from '../../app.component';

@Component({
  selector: 'app-verify-email',
  standalone: false,
  templateUrl: './verify-email.component.html',
  styleUrl: './verify-email.component.scss'
})
export class VerifyEmailComponent implements OnInit {

  email = '';

  code: string[] = ['', '', '', '', '', ''];

  loading = false;
  resending = false;

  errorMessage = '';
  successMessage = '';

  constructor(
          private authService: AuthService,
          private router: Router,
          private route: ActivatedRoute,
          public appComponent: AppComponent
      ) {}
  
      ngOnInit(): void {
          this.appComponent.setHome(false);
          this.appComponent.setLanding(true);
          this.appComponent.setStartGame(true);
          this.route.queryParams.subscribe(params => {

            const email = params['email'];

            if (email) {
                this.email = email;
            }

        });

        if (!this.email) {
            this.router.navigate(['/register']);
        }
    }


    onCodeInput(event: Event, index: number): void {

        const input = event.target as HTMLInputElement;

        const value = input.value
            .replace(/\D/g, '')
            .slice(0, 1);

        input.value = value;

        this.code[index] = value;

        if (value && index < 5) {

            const next =
                document.getElementById(
                    `verification-code-${index + 1}`
                ) as HTMLInputElement;

            next?.focus();
        }
    }


    onKeyDown(event: KeyboardEvent, index: number): void {

        if (
            event.key === 'Backspace' &&
            !this.code[index] &&
            index > 0
        ) {

            const previous =
                document.getElementById(
                    `verification-code-${index - 1}`
                ) as HTMLInputElement;

            previous?.focus();
        }
    }


    onPaste(event: ClipboardEvent): void {

        event.preventDefault();

        const pasted =
            event.clipboardData?.getData('text') || '';

        const digits =
            pasted
                .replace(/\D/g, '')
                .slice(0, 6);

        if (!digits) {
            return;
        }

        this.code = ['', '', '', '', '', ''];

        for (let i = 0; i < digits.length; i++) {
            this.code[i] = digits[i];
        }

        const focusIndex =
            Math.min(digits.length - 1, 5);

        setTimeout(() => {

            const input =
                document.getElementById(
                    `verification-code-${focusIndex}`
                ) as HTMLInputElement;

            input?.focus();

        });
    }


    getVerificationCode(): string {

        return this.code.join('');
    }


    verify(): void {

        this.errorMessage = '';
        this.successMessage = '';

        const code = this.getVerificationCode();

        if (!this.email) {

            this.errorMessage =
                'Adresse e-mail introuvable.';

            return;
        }

        if (!/^\d{6}$/.test(code)) {

            this.errorMessage =
                'Veuillez saisir les 6 chiffres du code reçu par e-mail.';

            return;
        }

        this.loading = true;

        this.authService.verifyEmail(this.email,
            code
        ).subscribe({

            next: response => {

                this.loading = false;

                if (!response.success) {

                    this.errorMessage =
                        response.message ||
                        'Impossible de vérifier votre adresse e-mail.';

                    return;
                }

                this.successMessage =
                    'Votre adresse e-mail est vérifiée !';


                setTimeout(() => {

                    if (response.user?.role === 'neurologue') {

                        this.router.navigate(['/neurologue']);

                    } else {

                        this.router.navigate(['/dashboard']);

                    }

                }, 500);
            },

            error: error => {

                this.loading = false;

                this.errorMessage =
                    error.error?.message ||
                    'Le code est incorrect ou a expiré.';
            }
        });
    }


    resendCode(): void {

        this.errorMessage = '';
        this.successMessage = '';

        if (!this.email || this.resending) {
            return;
        }

        this.resending = true;

        this.authService
            .resendVerificationCode(this.email
            )
            .subscribe({

                next: response => {

                    this.resending = false;

                    if (!response.success) {

                        this.errorMessage =
                            response.message ||
                            'Impossible de renvoyer le code.';

                        return;
                    }

                    this.code =
                        ['', '', '', '', '', ''];

                    this.successMessage =
                        'Un nouveau code vient de vous être envoyé.';

                    setTimeout(() => {

                        const firstInput =
                            document.getElementById(
                                'verification-code-0'
                            ) as HTMLInputElement;

                        firstInput?.focus();

                    }, 50);
                },

                error: error => {

                    this.resending = false;

                    this.errorMessage =
                        error.error?.message ||
                        'Impossible de renvoyer le code.';
                }
            });
    }
}