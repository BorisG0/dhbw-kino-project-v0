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
    
  }

  async loadData(){
    let myTest = await this.getMovieEvents(this.movie);
    await this.loadMovieEventsperDay();
    console.log("nach zweiter in loadata")
    console.log(this.movieEventsPerDay[1])
    return 1
  }

  testButton(){
    
    let promise = this.loadData();
    promise.then(result => console.log(result))
    console.log("load dasta fertig")
  }

  async tryAsync(){
    let startingValue = 2;
    console.log("vor erstem aufruf")
    let firstResult = await this.mySecondFunction(startingValue);
    console.log("nach erstem aufruf")
    let finalResult = await this.myThirdNestedFunction(firstResult);
    console.log(finalResult)
    return finalResult;
  }
  async  mySecondFunction(x: number) {
    console.log("in erstem drin")
    setTimeout(() => {}, 100);
    return 2 ** x;
  }
  async  myThirdNestedFunction(x: number) {
    console.log("im zweiten drin")
    setTimeout(() => {}, 100);
    return 3 ** x;
  }



  getMovie(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.movieService.getMovie(id).subscribe(movie => this.movie = movie);
  }

  goBack(): void {
    this.location.back();
  }

  getMovieEvents(movie: Movie): Promise<any> {
    this.movieService.getEventsForMovie(movie).subscribe(data =>{
      this.movieEvents = data;
      let T = data      
    })
    return new Promise((resolve) => {
      resolve(4);
    });
  }
  async loadMovieEventsperDay() {
    console.log("in zweiter drin")
    setTimeout(() => {}, 1000000);
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
    console.log(this.movieEventsPerDay[1])
    console.log("aus zweiter raus")

  }


}
