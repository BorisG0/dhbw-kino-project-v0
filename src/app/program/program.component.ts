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
    this.getMovies();
  }

  getMovies(): void{
    this.movieService.getMovies().subscribe(movies => this.movies = movies);
  }

  applyGenres(){
    this.selectedGenre = (document.getElementById("genre") as HTMLInputElement).value;
  }

  compairGenre(genre: String): Boolean{

    if(!this.selectedGenre || this.selectedGenre === ""){
      console.log("true")

      return true;
    } else if(genre.includes(this.selectedGenre)){
      console.log("true")
      return true;
    } else{
      console.log("false")
      return false;
    }
  }
}
