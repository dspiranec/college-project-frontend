import { Component } from '@angular/core';
import {  UserService } from '../../../services/user.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'user-loader',
  templateUrl: './user-loader.component.html',
  styleUrls: ['./user-loader.component.css']
})
export class UserLoaderComponent {
  color = 'accent';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.userService.isLoading;
  constructor(private userService: UserService){}
}