import { Component } from '@angular/core';
import { MovieService } from '../../../services/movie.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'movie-loader',
  templateUrl: './movie-loader.component.html',
  styleUrls: ['./movie-loader.component.css']
})
export class MovieLoaderComponent {
  color = 'accent';
  mode = 'indeterminate';
  value = 50;
  isLoading: Subject<boolean> = this.movieService.isLoading;
  constructor(private movieService: MovieService){}
}