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

    user: User;
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

              this.currentUser =
                  response.user;
          })
      );
  }

  register(data: any) {

      return this.http.post(
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
    ) {

      return this.http.post(
          `${this.api}/verify-email`,
          {
              email,
              code
          },
          {
              withCredentials: true
          }
      );
  }

  me() {

      return this.http.get<any>(
          `${this.api}/me`,
          {
              withCredentials: true
          }
      ).pipe(

          tap(response => {

              this.currentUser =
                  response.user;
          })
      );
  }

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

  get user(): User | null {

      return this.currentUser;
  }
}
