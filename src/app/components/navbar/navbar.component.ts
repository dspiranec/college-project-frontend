import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public loggedIn : boolean;
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  ngOnInit(): void {
    this.authService.authStatus.subscribe(
      status => this.loggedIn = status
    );
  }

  isAdmin(): boolean{
    let userRole = sessionStorage.getItem('currentUserRole');
    if(userRole === 'admin'){
      return true;
    }
    return false;
  }

  logout(event: MouseEvent){
    event.preventDefault();
    //POSTAVI LOG-IN STATUS NA FALSE
    this.authService.changeAuthStatus(false);

    //REDIRECT NA /PROFILE
    this.router.navigateByUrl('/login');

    //REMOVE TOKEN FROM LOCAL STORAGE
    this.tokenService.removeToken();

    sessionStorage.removeItem('currentUserId');
    sessionStorage.removeItem('currentUserRole');
  }
}
