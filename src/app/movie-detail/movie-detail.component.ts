import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MovieService } from '../movie.service';

import { Movie } from '../movie';
import { MovieEvent } from '../MovieEvent';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {

  movie: Movie = {id: 1, title: "placehold", duration: 10, ageRestriction: 0};
  movieEvents: MovieEvent[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMovie();
  }

  getMovie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovie(id).subscribe(movie => this.movie = movie);
  }

  goBack(): void {
    this.location.back();
  }

  getMovieEvents(movie: Movie): void{
    this.movieService.getEventsForMovie(movie).subscribe(data =>{
      this.movieEvents = data;
    })
  }

}
