import { Component, OnInit } from '@angular/core';

import { MovieService } from '../movie.service';

import { Movie } from '../movie';


@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  movies: Movie[] = [];
  selectedGenre: any;

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    if(this.selectedGenre == null){
      console.log("getMovies");
      this.getMovies();
    } else{
      console.log("genre");
      this.getMoviesByGenre(this.selectedGenre);
    }
    
  }

  getMovies(): void{
    this.movieService.getMovies().subscribe(movies => this.movies = movies);
  }

  applyGenres(){
    if(this.selectedGenre != null && !(this.selectedGenre === "")){
      console.log("genre Change");
      this.movies = [];
      this.getMoviesByGenre(this.selectedGenre);
    }else if(this.selectedGenre === ""){
      console.log("movies change");
      this.movies = [];
      this.getMovies();
    }
  }

  getMoviesByGenre(genre: String){
    this.movieService.getMoviesByGenre(genre).subscribe(movies => this.movies = movies);
  }
}
