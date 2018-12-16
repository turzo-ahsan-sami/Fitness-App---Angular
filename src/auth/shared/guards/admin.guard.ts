import { Router, CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Observable } from 'rxjs';

@Injectable()

export class AdminGuard implements CanActivate {
  constructor(
    private auth: AuthenticationService,
    private router: Router) {}

  canActivate(): Observable<boolean> | boolean {
    return this.auth.authState.pipe(
        map((user) => {
            if (user.uid !=='5I8TTANA98Zt4SPo4gKi1J2tdru1') { 
                this.router.navigate(['/user/schedule-plan']) 
            }
            return !!user;
        })
    )}
}
