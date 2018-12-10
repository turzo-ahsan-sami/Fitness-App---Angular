import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';

@Injectable()

export class RouterGuard implements CanActivate {
  constructor(
    private auth: AuthenticationService,
    private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.auth.authState.pipe(
        map((user) => {
            if (!user) { 
                this.router.navigate(['/secure/login']) 
            }
            return !!user;
        })
    )}
}
