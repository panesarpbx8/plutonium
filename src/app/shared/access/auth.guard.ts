import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { DialogService } from './dialog.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor (private auth: AuthService, private dialog: DialogService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.auth.user$.pipe(
      map(user => !!user),
      tap(isLoggedIn => {
        if (!isLoggedIn) {
          this.dialog.next({
            heading: 'Access denied',
            subHeading: 'You need to be logged in',
            type: 'error',
            basicButtonText: 'Login'
          });
        }
      }),
    );
  }
  
}
