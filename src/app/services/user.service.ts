import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';
import { Observable, of, Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  isLoading = new Subject<boolean>();
  show() {
      this.isLoading.next(true);
  }
  hide() {
      this.isLoading.next(false);
  }  

  private usersUrl = `http://localhost:8000/api/users`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getUserById(userId: number): Observable<User> {

    const url = `http://localhost:8000/api/current-user/${userId}`;

    return this.http.get<User>(url)
            .pipe(
            tap(_ => console.log('fetched user w/ ID-'+userId)),
            catchError(this.handleError<User>('getCurrUser'))
        );
  }

  getRoleUsers():Observable<User[]> {
        
    return this.http.get<User[]>(`http://localhost:8000/api/role-users`)
        .pipe(
        tap(_ => console.log('fetched roles(users)')),
        catchError(this.handleError<User[]>('getRoleUsers', []))  
    );
  }

  getRoleAdmins():Observable<User[]> {
        
    return this.http.get<User[]>(`http://localhost:8000/api/role-admins`)
        .pipe(
        tap(_ => console.log('fetched roles(admins)')),
        catchError(this.handleError<User[]>('getRoleAdmins', []))  
    );
  }
/*
  getUsers(): Observable<User[]> {
        
    return this.http.get<User[]>(this.usersUrl)
        .pipe(
        tap(_ => console.log('fetched users')),
        catchError(this.handleError<User[]>('getUsers', []))  
    );
  }
*/

  grantAdmin(user: User): Observable<User> {

  const urlById = `http://localhost:8000/api/grant-admin/${user.id}`;

  return this.http.get<User>(urlById)
    .pipe(catchError(this.handleError('updateUser', user))
    );
  }

  revokeAdmin(user: User): Observable<User> {

    const urlById = `http://localhost:8000/api/revoke-admin/${user.id}`;
  
    return this.http.get<User>(urlById)
      .pipe(catchError(this.handleError('updateUser', user))
      );
    }

  deleteUser(id: number){
    const url = `${this.usersUrl}/${id}`;

    return this.http.delete(url,this.httpOptions)
    .subscribe(_ => console.log(`deleted user w/ ID=`+id)),
    catchError(this.handleError<User>('deleteUser'));

  }

  updateUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/${user.id}`;
    return this.http.put<User>(url, user)
    .pipe(catchError(this.handleError('updateUser', user))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        console.error(operation);
        console.error(error);
        return of(result as T);
    };
}
}