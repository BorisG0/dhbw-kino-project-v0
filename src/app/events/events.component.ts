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

  displayedColumns: string[] = ['room','date','time'];



    inputRoomid : number |undefined;
    inputMovieid : number |undefined;
    inputEventid : number |undefined;
    inputDate : Date = new Date();
    inputMinutes : number |undefined;
    inputWeekDay : string |undefined;
    inputTime: string = "";
    timeWithSec: string = "";
    movieId: number = -1;
    eventId: number = -1;

    inEditEvents: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
     if(this.route.snapshot.routeConfig?.path?.includes('edit')){
      this.inEditEvents = true
     };
     console.log(this.inEditEvents)
     

    this.loadData();
  }


  async loadData(){
    if(this.inEditEvents==false){
      await this.getMovie();
      await this.getMovieEvents(this.movie);
      //this.loadMovieEventsperDay();
    }
    else{
      this.movieId = Number(this.route.snapshot.paramMap.get('mId'));
      await this.getEvent();
    }
  }
  
  getEvent(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.eventId = Number(this.route.snapshot.paramMap.get('eId'));
        this.movieService.getEventById(this.eventId).subscribe(event =>{
          this.inputDate = event.date;
          this.inputRoomid = event.roomId;
          this.timeWithSec = event.time;
          this.inputTime = event.time.slice(0,-3)
          console.log(event.time)
          resolve(0)
          })
      }, 0)
    })
  }

  getMovie() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.movieId = Number(this.route.snapshot.paramMap.get('id'));
        this.movieService.getMovie(this.movieId).subscribe(movie =>{
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

  /*loadMovieEventsperDay() {
    let tempArray : MovieEvent[] = [];
    this.movieEvents.forEach(movieEvent => {
      let tempDate: Date = new Date(movieEvent.date);
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

  }*/

  onPressUpdate(){ 
    if( this.inputDate != undefined && this.inputTime != undefined &&  this.inputRoomid != undefined ){
      this.timeWithSec = this.inputTime+":00";
            if(this.timeWithSec.length){
        this.timeWithSec = "0" + this.timeWithSec;
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(new Date())
          if(this.inputRoomid!= undefined && this.inputDate != undefined && this.timeWithSec != undefined){

            this.movieService.updateEvent({id: this.eventId, date: this.inputDate, time: this.timeWithSec , movieId: this.movieId, roomId: this.inputRoomid}).subscribe(
              data => {
                console.log(data)
                resolve(0);
              }
            );
          }
          
        }, 0)
      })
    }
    return;
  }

  onPressCreate(){    
  
    if( this.inputDate != undefined && this.inputTime != undefined &&  this.inputRoomid != undefined ){
      this.timeWithSec = this.inputTime+":00";
      console.log(this.timeWithSec.length)
      if(this.timeWithSec.length){
        this.timeWithSec = "0" + this.timeWithSec;
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(this.timeWithSec)
          if(this.inputRoomid!= undefined && this.inputDate != undefined && this.timeWithSec != undefined){

            this.movieService.addEvent({id:-1, date: this.inputDate, time: this.timeWithSec , movieId: this.movieId, roomId: this.inputRoomid}).subscribe(
              data => {
                console.log(data)
                resolve(0);
              }
            );
          }
          
        }, 0)
      })
    }
    return;
  }

  onPressDelete(){ 
      /*if(this.inputEventid != undefined && this.inputDate == undefined &&  this.inputHours == undefined && this.inputMinutes == undefined &&  this.inputMovieid != undefined &&  this.inputRoomid == undefined &&  this.inputWeekDay == undefined){
        console.log("deleted: " + this.inputEventid);
      }*/
  }

}
