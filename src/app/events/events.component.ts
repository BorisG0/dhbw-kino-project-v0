import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { MovieService } from '../movie.service';

import { Movie } from '../movie';
import { MovieEvent } from '../MovieEvent';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';



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

  getInput(){
    var roomid = (document.getElementById('roomId') as HTMLInputElement | null)?.value;
    var movieid = (document.getElementById('movieId') as HTMLInputElement | null)?.value;
    var eventid = (document.getElementById('eventId') as HTMLInputElement | null)?.value;
    var date = (document.getElementById('date') as HTMLInputElement | null)?.value;
    var time = (document.getElementById('time') as HTMLInputElement | null)?.value;

    alert([eventid, movieid, roomid, date, time]);
  }

}
