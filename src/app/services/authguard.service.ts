import { Injectable } from '@angular/core';

import {
    CanActivate,
    Router
} from '@angular/router';

import {
    catchError,
    map,
    of
} from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

    constructor(
        private auth: AuthService,
        private router: Router
    ) {}


    canActivate() {

        return this.auth.me().pipe(

            map(() => {

                return true;
            }),

            catchError(() => {

                this.router.navigate([
                    '/login'
                ]);

                return of(false);
            })
        );
    }
}
