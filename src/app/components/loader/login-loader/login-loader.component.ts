import { Component } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'login-loader',
  templateUrl: './login-loader.component.html',
  styleUrls: ['./login-loader.component.css']
})
export class LoginLoaderComponent {
  color = 'accent';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.loginService.isLoading;
  constructor(private loginService: LoginService){}
}