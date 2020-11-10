import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    private router: Router,
    private tokenService : TokenService,
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.isLoggedIn();
  }

  isLoggedIn(): boolean {
    let flag = this.tokenService.isLoggedIn();
    if(flag){
      return true;
    }
    else{
      sessionStorage.removeItem('currentUserId');
      sessionStorage.removeItem('currentUserRole');
      this.router.navigate(['/login']);
      return false;
    }
  }
}

