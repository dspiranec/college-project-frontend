import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { Observable, of, Subject } from "rxjs";
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../interfaces/user';

@Injectable({
    providedIn: 'root'
})

export class MovieService {

    isLoading = new Subject<boolean>();
    show() {
        this.isLoading.next(true);
    }
    hide() {
        this.isLoading.next(false);
    }
    
    private moviesUrl = `http://localhost:8000/api/movies`;
    
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    constructor(private http: HttpClient) { }

    getMovies(): Observable<Movie[]> {
        
        return this.http.get<Movie[]>(this.moviesUrl)
            .pipe(
            tap(_ => console.log('fetched movies')),
            catchError(this.handleError<Movie[]>('getMovies', []))  
        );
    }

    getMovieById(id: number): Observable<Movie> {

        const urlById = `${this.moviesUrl}/${id}`;

        return this.http.get<Movie>(urlById)
            .pipe(
            tap(_ => console.log('fetched movie')),
            catchError(this.handleError<Movie>('getMovie'))
        );
    }

    getUserById(userId: number): Observable<User> {

        const url = `http://localhost:8000/api/current-user/${userId}`;
    
        return this.http.get<User>(url)
                .pipe(catchError(this.handleError<User>('getCurrUser'))
            );
      }

    addMovie(movie: Movie): Observable<Movie> {
        return this.http.post<Movie>(this.moviesUrl, movie, this.httpOptions)
        .pipe(catchError(this.handleError<Movie>('addMovie'))
        );
    }

    deleteMovie(id: number): Observable<Movie>{
        const url = `${this.moviesUrl}/${id}`;

        return this.http.delete<Movie>(url,this.httpOptions)
        .pipe(catchError(this.handleError<Movie>('deleteMovie')));

    }

    updateMovie(movie: Movie): Observable<Movie> {
        const url = `${this.moviesUrl}/${movie.id}`;
        return this.http.put<Movie>(url, movie)
        .pipe(catchError(this.handleError('updateMovie', movie))
        );
    }

    addToFavorites(userId: number, movieId: number): Observable<Movie> {

        const urlById = `http://localhost:8000/api/favorites/add/${userId}/${movieId}`;
        return this.http.get<Movie>(urlById)
            .pipe(
            catchError(this.handleError<Movie>('addToFavorites'))
        );
    }

    removeFromFavorites(userId: number, movieId: number): Observable<Movie> {

        const urlById = `http://localhost:8000/api/favorites/remove/${userId}/${movieId}`;
        return this.http.get<Movie>(urlById)
            .pipe(catchError(this.handleError<Movie>('addToFavorites'))
            );
    }

    getFavorites(userId: number): Observable<Movie[]> {
        
        const urlById = `http://localhost:8000/api/favorites/${userId}`;
        return this.http.get<Movie[]>(urlById)
            .pipe(catchError(this.handleError<Movie[]>('getFavorites', []))  
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