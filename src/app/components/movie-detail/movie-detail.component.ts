import { Component, OnInit } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Movie } from '../../interfaces/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})

export class MovieDetailComponent implements OnInit {

  movies: Movie[];
  movie: Movie;
  id: number;

  constructor(
    private movieService: MovieService, 
    private route: ActivatedRoute,
    private router: Router,
    protected sanitizer: DomSanitizer
    ) {  }

  ngOnInit(): void {
    
    this.id = +this.route.snapshot.paramMap.get('id');

    this.movieService.getMovieById(this.id)
    .subscribe(
      data=>this.handleResponse(data)
    ); 
  }

  handleResponse(data){
    if(!data){ 
      this.router.navigateByUrl('/not-found');  
    }
    else{
      this.movie = data;
    }
  }

  safeURL(url: string) {
    var link = "https://www.youtube.com/embed/" + url;
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

}
