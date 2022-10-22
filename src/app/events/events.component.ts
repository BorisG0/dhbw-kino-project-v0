import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { MovieService } from '../movie.service';

import { Movie } from '../movie';
import { MovieEvent } from '../MovieEvent';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { Time } from '@angular/common';



@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  movies: Movie[] = [];
  movie: Movie = {id: 1, title: "placehold", duration: 10, ageRestriction: 0, imageName: 'img0.png', description: '', genre: '', startDate: new Date('0000-00-00'), movieStudio: '', regie: '', cast: '', trailerLink: 'https://www.youtube.com/embed/6DxjJzmYsXo'};
  movieEvents: MovieEvent[] = [];
  movieEventsPerDay: MovieEvent[][] = [];
  safeSrc: SafeResourceUrl | undefined;


    inputRoomid : number |undefined;
    inputMovieid : number |undefined;
    inputEventid : number |undefined;
    inputDate : Date |undefined;
    inputHours : number |undefined;
    inputMinutes : number |undefined;
    inputWeekDay : string |undefined;
    inputTime: Time |undefined;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
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
      let tempDate: Date = new Date(movieEvent.date);
      movieEvent.weekDay = this.weekDayIndexToString(tempDate.getDay());
      if(tempArray.length>0){
        if(tempArray[0].date == movieEvent.date){
          tempArray.push(movieEvent)
        }
        else{
          this.movieEventsPerDay.push(tempArray)
          tempArray = [];
          tempArray.push(movieEvent);
        }
      }else{
        tempArray.push(movieEvent)
      }

    })
    if(tempArray.length>0){
      this.movieEventsPerDay.push(tempArray)
    }

  }

  weekDayIndexToString(dayOfWeek: number){
    const weekDays: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return weekDays[dayOfWeek];
  }

  onPressUpdate(){
    let newEvent : MovieEvent;
    
      if(this.inputEventid != undefined && this.inputDate != undefined &&  this.inputHours != undefined && this.inputMinutes != undefined &&  this.inputMovieid != undefined &&  this.inputRoomid != undefined &&  this.inputWeekDay != undefined){
        this.inputTime = {hours: this.inputHours, minutes: this.inputMinutes};
        newEvent = { id: this.inputEventid, date: this.inputDate, time: this.inputTime, movieId: this.inputMovieid, roomId: this.inputRoomid, weekDay: this.inputWeekDay}
        console.log(newEvent);
      }
  }

  onPressCreate(){
    let newEvent : MovieEvent;
    
      if(this.inputEventid != undefined && this.inputDate != undefined &&  this.inputHours != undefined && this.inputMinutes != undefined &&  this.inputMovieid != undefined &&  this.inputRoomid != undefined &&  this.inputWeekDay != undefined){
        this.inputTime = {hours: this.inputHours, minutes: this.inputMinutes};
        newEvent = { id: this.inputEventid, date: this.inputDate, time: this.inputTime, movieId: this.inputMovieid, roomId: this.inputRoomid, weekDay: this.inputWeekDay}
        console.log(newEvent);
      }
  }

  onPressDelete(){ 
      if(this.inputEventid != undefined && this.inputDate == undefined &&  this.inputHours == undefined && this.inputMinutes == undefined &&  this.inputMovieid != undefined &&  this.inputRoomid == undefined &&  this.inputWeekDay == undefined){
        console.log("deleted: " + this.inputEventid);
      }
  }

}
