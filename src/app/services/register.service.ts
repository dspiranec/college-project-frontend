import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  isLoading = new Subject<boolean>();
  show() {
      this.isLoading.next(true);
  }
  hide() {
      this.isLoading.next(false);
  }
  
  constructor( private http: HttpClient ) { }

  private url = 'http://localhost:8000/api';

  register(data){
    return this.http.post(`${this.url}/register`, data);
  }
}
