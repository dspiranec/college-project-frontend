import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../../services/register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {


  public error = [];

  public flagEmail = false;
  public flagPassword = false;
  public flagRegister = false;
  public form = {
    name: null,
    email: null,
    password: null,
    passsword_repeat: null
  }

  constructor(
    private registerService: RegisterService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.flagEmail = false;
    this.flagPassword = false;
    
    if(!this.form.email.includes("@")){
      this.flagEmail = true;
    }
    if(this.form.password != this.form.passsword_repeat){
      this.flagPassword = true;
    }
    
    // stop here if form is invalid
    if(this.flagEmail || this.flagPassword){
      return ;
    }

    this.registerService.register(this.form).subscribe(
      data=>this.handleResponse(data),
      error=>this.handleError(error)
      );
  }

  handleError(error){
    this.flagRegister = false;
    this.error = error.error.errors;
  }

  handleResponse(data){
    
    if(data.success){
      this.flagRegister = true;
      this.form.name = '';
      this.form.email = '';
      this.form.password = '';
      this.form.passsword_repeat = '';
      this.error = [];
    }
    else {
      this.flagRegister = false;
      
    }

    this.router.navigateByUrl('/register');  
  } 
}






