import { Component } from '@angular/core';
import { RegisterService } from '../../../services/register.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'register-loader',
  templateUrl: './register-loader.component.html',
  styleUrls: ['./register-loader.component.css']
})
export class RegisterLoaderComponent {
  color = 'accent';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.registerService.isLoading;
  constructor(private registerService: RegisterService){}
}