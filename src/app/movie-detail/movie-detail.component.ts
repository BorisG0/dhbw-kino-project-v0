import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';

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
  movies: Movie[] = [];
  movie: Movie = {id: 1, title: "placehold", duration: 10, ageRestriction: 0, imageName: '', description: '', genre: '', startDate: new Date('0000-00-00'), movieStudio: '', regie: '', cast: '', trailerLink: ''};
  movieEvents: MovieEvent[] = [];
  movieEventsPerDay: MovieEvent[][] = [];

  constructor(
    private route: ActivatedRoute,
    private _route: Router,
    private movieService: MovieService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadData();
    this.getMovies();

  }
  getMovies(): void{
    this.movieService.getMovies().subscribe(movies =>{

     this.movies = movies
    });
  }

  async loadData(){
    await this.getMovie();
    await this.getMovieEvents(this.movie);
    this.loadMovieEventsperDay();
  }

  getMovie() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.movieService.getMovie(id).subscribe(movie =>{
          this.movie = movie;
          resolve(0)
          })
      }, 0)
    })
  }
  changedMovie() {
     /* this._route.navigate(['/detail/'+movieId])
    this.getMovie();
    this.movieEvents = [];
    this.loadData();*/
    //window.location.reload();
  }

  goBack(): void {
    this.location.back();
  }

  getMovieEvents(movie: Movie) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.movieService.getEventsForMovie(movie).subscribe(data =>{
          this.movieEvents = data;
          resolve(0)
        })
      }, 0)
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
