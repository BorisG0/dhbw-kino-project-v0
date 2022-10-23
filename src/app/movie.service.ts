import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { MessageService } from './message.service';

import { Movie } from './movie';
import { MovieEvent } from './MovieEvent';
import { MOVIES } from './mock-movies';
import { SeatInEvent } from './seatInEvent';
import { BookingCreation } from './BookingCreation';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    //const movies = of(MOVIES);

    this.messageService.add('MovieService: fetched Movies');
    return this.http.get<Movie[]>("/api/movies");
  }

  getMovie(id: number): Observable<Movie> {
    //const movie = MOVIES.find(m => m.id === id)!;
    //return of(movie);

    this.messageService.add(`MovieService: fetched Movie id=${id}`)
    return this.http.post<Movie>("/api/movie", id);
  }

  getMoviesByGenre(genre: String): Observable<Movie[]> {

    this.messageService.add(`MovieService: fetched Movie genre=${genre}`)
    return this.http.post<Movie[]>("/api/moviesByGenre", genre);
  }

  getEventsForMovie(movie: Movie){
    this.messageService.add(`getting events for movie ${movie.id}`);
    return this.http.post<MovieEvent[]>("/api/eventsformovie", movie);
  }

  getEventById(id: number){
    console.log("getting event by id: " + id);
    return this.http.post<MovieEvent>("/api/eventById", id);
  }

  getSeatsInEventId(eventId: number){
    return this.http.post<SeatInEvent[]>("/api/seatsInEvent", eventId);
  }

  setSeatInEventStatus(seatInEvent: SeatInEvent){
    console.log("setting status");
    return this.http.post<boolean>("/api/setStatusForSeatInEvent", seatInEvent);
  }

  addMovie(movie: Movie){
    console.log("adding Movie");
    return this.http.post<String>("/api/addMovie", movie);
  }
  updateMovie(movie: Movie){
    console.log("updating Movie");
    return this.http.post<String>("/api/updateMovie", movie);
  }
  setMovieInactive(id: number){
    console.log("setting movie inactive");
    return this.http.post<String>("/api/SetMovieInactive", id);
  }

  newBooking(booking: BookingCreation){
    console.log("newBooking() called");
    return this.http.post<boolean>("/api/newBooking", booking);
  }
}
