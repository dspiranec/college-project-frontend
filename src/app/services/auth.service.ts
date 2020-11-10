import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from '../services/token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private loggedIn = new BehaviorSubject <boolean> (this.tokenService.isLoggedIn());

  constructor(private tokenService: TokenService) { }

  
  authStatus = this.loggedIn.asObservable();

  changeAuthStatus(value :boolean){
    this.loggedIn.next(value);
  }

}
