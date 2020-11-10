import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form = {
    email: null,
    password: null
  }
  public error = null;

  constructor(
    private loginService: LoginService,
    private tokenService: TokenService,
    private router: Router,
    private authService: AuthService
    ) { }

  ngOnInit(): void {
    
  }

  onSubmit(){

    this.loginService.login(this.form).subscribe(
      data=>this.handleResponse(data),
      error=>this.handleError(error)
    );
  }

  handleError(error){
    this.error = error.error.error;
  }
  
  handleResponse(data){
    //SPREMANJE TOKENA NA LOCAL STORAGE
    this.tokenService.handle(data.access_token);

    //console.log(data);
    //console.log(data.role);

    //POSTAVI LOG-IN STATUS NA TRUE
    this.authService.changeAuthStatus(true);
    
    //REDIRECT NA /PROFILE
    this.router.navigateByUrl('/profile');  

    sessionStorage.setItem('currentUserRole', data.role);
    sessionStorage.setItem('currentUserId', data.userId);
  } 

}
