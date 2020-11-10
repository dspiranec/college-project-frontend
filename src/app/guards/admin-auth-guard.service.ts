import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService,
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.checkLogin();
    }

    checkLogin(): boolean {
        let userRole = sessionStorage.getItem('currentUserRole');

        if (userRole) {
            if (userRole === 'admin') {
                return true;
            } else {
                this.router.navigate(['/forbidden']);
                return false;
            }
        } else {
            this.router.navigate(['/login']);
            return false;
        }
        
    }
}

