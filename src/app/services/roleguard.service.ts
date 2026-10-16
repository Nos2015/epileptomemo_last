import { Injectable } from '@angular/core';

import {
    CanActivate,
    ActivatedRouteSnapshot,
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
export class RoleguardService implements CanActivate{

  constructor(private auth: AuthService,
        private router: Router) { }
  
  canActivate(
        route: ActivatedRouteSnapshot
    ) {

        const expectedRole =
            route.data['role'];


        return this.auth.me().pipe(

            map(response => {

                const user =
                    response.user;

                if(user !=null){
                    if (
                        user.role === expectedRole
                    ) {

                        return true;
                    }

                    if (
                        user.role === 'patient'
                    ) {

                        this.router.navigate([
                            '/patient'
                        ]);

                    } else {

                        this.router.navigate([
                            '/neurologue'
                        ]);
                    }
                }

                return false;
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
