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
    this.loadData();
  }

  async loadData(){
    await this.getMovie();
    await this.getMovieEvents(this.movie);
    this.loadMovieEventsperDay();
  }

  getMovie() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovie(id).subscribe(movie => this.movie = movie);
    return new Promise((resolve, reject) => {
      setTimeout(() => {resolve(0)}, 3000)
    })
  }

  goBack(): void {
    this.location.back();
  }

  getMovieEvents(movie: Movie) {
    this.movieService.getEventsForMovie(movie).subscribe(data =>{
      this.movieEvents = data;
      let T = data 
           
    })
    return new Promise((resolve, reject) => {
      setTimeout(() => {resolve(0)}, 3000)
    })
  }
  loadMovieEventsperDay() {
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
