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

  movie: Movie = {id: 1, title: "placehold", duration: 10, ageRestriction: 0, imageName: ''};
  movieEvents: MovieEvent[] = [];
  movieEventsPerDay: MovieEvent[][] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMovie();
    this.getMovieEvents(this.movie);
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
  loadMovieEventsperDay(): void{
    let tempArray : MovieEvent[] = [];
    this.movieEvents.forEach(movieEvent => {

      if(tempArray.length>0){
        if(tempArray[0].date == movieEvent.date){
          tempArray.push(movieEvent)
        }
        else{
          this.movieEventsPerDay.push(tempArray)
          tempArray = [];
          tempArray.push(movieEvent)
        }
      }else{
        tempArray.push(movieEvent)
      }

    })
    if(tempArray.length>0){
      this.movieEventsPerDay.push(tempArray)
    }
  }


}
