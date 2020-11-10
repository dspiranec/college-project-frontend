import { Component, OnInit } from '@angular/core';
import { Movie } from '../../interfaces/movie';
import { MovieService } from '../../services/movie.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {


  movies: Movie[];
  editMovie: Movie;
  movieForm : FormGroup;
  submitted = false;
  currentUserId: number;
  favorites: Movie[];
  movieDeleted: false;
  error = null;
  message = null;

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private tokenService: TokenService
    ) { 
      
    }
    
  ngOnInit(): void {
    this.getMovies();
    if(this.isLoggedIn()){
      this.currentUserId = +sessionStorage.getItem('currentUserId');
      this.getFavorites(this.currentUserId);
    }
    
    this.movieForm = this.formBuilder.group({
      movieName: ['', Validators.required],
      yearRelease: ['', Validators.required],
      movieLength: ['', Validators.required],
      actors: ['', Validators.required],
      director: ['', Validators.required],
      imbd: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.movieForm.invalid) {
        return;
    }
  }
	
  get f() { return this.movieForm.controls; }
  
  isLoggedIn(): boolean {
    let flag = this.tokenService.isLoggedIn();
    if(flag){
      return true;
    }
    else{
      return false;
    }
  }

  isAdmin(): boolean{
    let userRole = sessionStorage.getItem('currentUserRole');
    if(userRole === 'admin'){
      return true;
    }
    return false;
  }

  getMovies(): void {
    this.movieService.getMovies()
    .subscribe(movies => this.movies = movies);
    
  }

  add(name: string, year_realase: number, movie_length: number, actors: string, director: string, imbd: number, description: string): void{

    if(!name || !year_realase || !movie_length || !actors || !director || !imbd || !description){
      return ;
    } 

    this.editMovie = undefined;
    name = name.trim();
    actors = actors.trim();
    director = director.trim();
    description = description.trim();
    

    const newMovie: Movie = { name, year_realase, movie_length, actors, director, imbd, description } as unknown as Movie;
    this.movieService
      .addMovie(newMovie)
      .subscribe(movie => {
        this.movies.push(movie);
        //console.log(movie);
      });
  }

  delete(movie: Movie): void{
    if(confirm("Are you sure you want to delete movie - "+movie.name)) {
      this.movieService.deleteMovie(movie.id).subscribe(
        data=>this.handleResponse(data),
        error=>this.handleError(error)
      );

      this.movies = this.movies.filter(movies => movies.id !== movie.id);
      
    }
    
  }

  edit(movie){
   this.editMovie = movie;
  }

  update(){
    if(this.editMovie){
      this.movieService.updateMovie(this.editMovie)
      .subscribe(movie => {
        const index = movie ? this.movies.findIndex(m => m.id === movie.id) : -1
        if(index > -1 ){
          this.movies[index] = movie
        }
        },
        data=>this.handleResponse(data)
      );

      this.editMovie = undefined;
    }
  }

  addToFavorites(movie: Movie): void{
    
    this.movieService.addToFavorites(this.currentUserId, movie.id)
    .subscribe(//_ => {
      //this.favorites.push(movie),
      data=>this.handleResponse(data),
      error=>this.handleError(error)
    //}
    );
  }

  removeFromFavorites(movie: Movie): void{
    
    this.movieService.removeFromFavorites(this.currentUserId, movie.id)
    .subscribe(//_ => {
      //this.favorites = this.favorites.filter(favorites => favorites.id !== movie.id),
      data=>this.handleResponse(data),
      error=>this.handleError(error)
    //}
    );
  }

  getFavorites(userId: number): void{
    this.movieService.getFavorites(userId)
    .subscribe(favorites =>{
      this.favorites = favorites,
      data=>this.handleResponse(data),
      error=>this.handleError(error)
    });
  }

  isFavorite(movieId: number): boolean{
    if(this.favorites){
      for (const [nonEmportant, favorite] of Object.entries(this.favorites)){
        if(favorite.id === movieId){
          return true;
        }
      }
    }
 
    return false;
  }

  handleResponse(data){
    if(data.added){ //AddNewMovie
      this.message = data.added;
    }
    if(data.updated){//Update
      this.message = "Movie updated!";
    }
    if(data.deleted){//Delete
      this.message = data.deleted
    }
    if(data.alreadyAdded){//AlreadyFav
      this.message = data.alreadyAdded;
    }
    if(data.addedToFav){//AddToFavorites
      this.message = data.addedToFav;
      this.favorites.push(data.movie);
    }
    if(data.alreadyRemoved){//ALreadyRemoved
      this.message = data.alreadyRemoved
    }
    if(data.removed){//RemovedFromFavorites
      this.message = data.removed;
      this.favorites = this.favorites.filter(favorites => favorites.id !== data.movie.id);
    }
  }
  
  handleError(error){
    this.error = error.error.error;
  }

}
	