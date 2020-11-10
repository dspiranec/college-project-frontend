import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  handle(token){
    this.setToken(token);
    //console.log(this.isValid());
  }

  setToken(token){
    localStorage.setItem('token', token);
  }

  getToken(){
    return localStorage.getItem('token');
  }

  removeToken(){
    localStorage.removeItem('token');
  }
  
  isValid(){
    const token = this.getToken();

    if(token){
      //SPLIT TOKEN
      const payload = this.payLoad(token);
      
      if(payload){
        if(payload.iss == "http://localhost:8000/api/login" ||
           payload.iss == "http://localhost:8000/api/register"){
            return true;
        }
      }
      return false;
    }
  }

  payLoad(token){
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload){ //DEKODIRANJE TOKENA
    return JSON.parse(atob(payload));
  }

  isLoggedIn(){
    return this.isValid();
  }
  
}
