import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface User {

    id: number;

    email: string;

    firstName: string;

    lastName: string;

    role: 'patient' | 'neurologue';
}

interface AuthResponse {

    success: boolean;

    message?: string;

    user?: User;

    requiresEmailVerification?: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private api =
        'http://localhost:3001/api/auth';

  private currentUser:
        User | null = null;


  constructor(
      private http: HttpClient
  ) {}

  login(
        email: string,
        password: string
    ): Observable<AuthResponse> {

      return this.http.post<AuthResponse>(
          `${this.api}/login`,
          {
              email,
              password
          },
          {
              withCredentials: true
          }
      ).pipe(

          tap(response => {

              if (response.user) {

                    this.currentUser =
                        response.user;
            }
          })
      );
  }

  register(data: any) : Observable<AuthResponse>{

      return this.http.post<AuthResponse>(
          `${this.api}/register`,
          data,
          {
              withCredentials: true
          }
      );
  }

  verifyEmail(
        email: string,
        code: string
    ) : Observable<AuthResponse> {

      return this.http.post<AuthResponse>(
          `${this.api}/verify-email`,
          {
              email,
              code
          },
          {
              withCredentials: true
          }
        ).pipe(

            tap(response => {

                /*
                 * Pour un patient, le serveur crée
                 * maintenant directement la session
                 * après validation du code.
                 */

                if (response.user) {

                    this.currentUser =
                        response.user;
                }

            })

        );
  }

    // =====================================================
    // RENVOI DU CODE
    // =====================================================

    resendVerificationCode(
        email: string
    ): Observable<AuthResponse> {

        return this.http.post<AuthResponse>(
            `${this.api}/resend-verification-code`,
            {
                email
            },
            {
                withCredentials: true
            }
        );
    }


    // =====================================================
    // UTILISATEUR CONNECTÉ
    // =====================================================

    me(): Observable<AuthResponse> {

        return this.http.get<AuthResponse>(
            `${this.api}/me`,
            {
                withCredentials: true
            }
        ).pipe(

            tap(response => {

                if (response.user) {

                    this.currentUser =
                        response.user;
                }

            })

        );
    }

    // =====================================================
    // DÉCONNEXION
    // =====================================================

    logout() {

        return this.http.post(
            `${this.api}/logout`,
            {},
            {
                withCredentials: true
            }
        ).pipe(

            tap(() => {

                this.currentUser =
                    null;
            })

        );
    }

    // =====================================================
    // GETTER
    // =====================================================

    get user(): User | null {

        return this.currentUser;
    }
}
