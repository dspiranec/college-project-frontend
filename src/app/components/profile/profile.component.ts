import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';
import { Movie } from 'src/app/interfaces/movie';
import { User } from 'src/app/interfaces/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  public currentUserRole = '';

  currentUserId: number;
  favorites: Movie[];
  currentUser: User;

  constructor(
    private movieService: MovieService
    ) { 
      
    }

  ngOnInit(): void {
    this.currentUserRole = sessionStorage.getItem('currentUserRole').toUpperCase();
    this.currentUserId = +sessionStorage.getItem('currentUserId');
    this.getCurrentUser(this.currentUserId);
    this.getFavorites(this.currentUserId);
  }

  getFavorites(userId: number): void{
    this.movieService.getFavorites(userId)
    .subscribe(favorites =>{
      this.favorites = favorites
      //data=>console.log(data);
      //error=>console.log(error);
    });
  }

  getCurrentUser(userId: number): void{
    this.movieService.getUserById(userId)
    .subscribe(user =>{
      this.currentUser = user
      //data=>console.log(data);
      //error=>console.log(error);
    });
  }

}
