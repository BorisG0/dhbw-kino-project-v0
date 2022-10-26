import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { MessageService } from './message.service';

import { Movie } from './movie';
import { User } from './user';

import { MovieEventForBackend } from './MovieEventForBackend';

import { MovieEvent } from './MovieEvent';
import { MOVIES } from './mock-movies';
import { SeatInEvent } from './seatInEvent';
import { BookingCreation } from './bookingCreation';
import { Ticket } from './ticket';
import { StatusChange } from './statusChange';
import { Customer } from './customer';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  logUser: User | undefined;

  constructor(private messageService: MessageService, private http: HttpClient) { }

  getMovies(): Observable<Movie[]> {
    //const movies = of(MOVIES);

    this.messageService.add('MovieService: fetched Movies');
    return this.http.get<Movie[]>("/api/movies");
  }
  getMoviesForEmployees(): Observable<Movie[]> {
    //const movies = of(MOVIES);

    this.messageService.add('MovieService: fetched Movies for Employees');
    return this.http.get<Movie[]>("/api/empMovies");
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
  addEvent(event: MovieEventForBackend){
    console.log("adding Event");
    return this.http.post<String>("/api/addEvent", event);
  }
  updateEvent(event: MovieEventForBackend){
    console.log("updating Event");
    return this.http.post<String>("/api/updateEvent", event);
  }
  deleteEvent(id: number){
    console.log("deleting Event");
    return this.http.post<String>("/api/deleteEvent", id);
  }
  login(user : User) : Observable<User> {
    console.log("trying to login user");
    console.log(user);
    return this.http.post<User>("/api/user",user);
  }

  setUser(user : User){
    this.logUser = user;
    console.log(this.logUser);
  }

  getUser() {
    if(this.logUser!=null){
      return this.logUser;
    }
    return;
  }

  //Booking Stuff Start
  newBooking(booking: BookingCreation){
    console.log("newBooking() called");
    return this.http.post<boolean>("/api/newBooking", booking);
  }

  getTicketsInEventId(eventId: number){
    return this.http.post<Ticket[]>("/api/ticketsInEvent", eventId);
  }

  setStatusForTicket(statusChange: StatusChange){
    console.log("statusChange() called");
    return this.http.post<boolean>("/api/setStatusForTicket", statusChange);
  }


  //Booking Stuff End

  addCustomer(customer: Customer){
    console.log("adding Customer");
    return this.http.post<String>("/api/addCustomer", customer);
  }
}
