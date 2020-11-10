import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  isLoading = new Subject<boolean>();
  show() {
      this.isLoading.next(true);
  }
  hide() {
      this.isLoading.next(false);
  }  

  constructor(private http: HttpClient) { }

  private url = 'http://localhost:8000/api';

  login(data){
    return this.http.post(`${this.url}/login`, data);
  }

  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('currentUserId');
    sessionStorage.removeItem('currentUserRole');
  }
}
