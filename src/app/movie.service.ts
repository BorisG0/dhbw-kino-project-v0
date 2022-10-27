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
import { BookingInfo } from './bookingInfo';

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
  getCurrentEventsForMovie(movieId : number){
    this.messageService.add(`getting events for movie ${movieId}`);

    return this.http.post<MovieEvent[]>("/api/movieEvents", movieId);
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
    return this.http.post<boolean>("/api/addMovie", movie);
  }
  
  updateMovie(movie: Movie){
    console.log("updating Movie");
    return this.http.post<boolean>("/api/updateMovie", movie);
  }
  changeMovieActivity(movie: Movie){
    console.log("changing movie activity");
    console.log(movie)
    return this.http.post<boolean>("/api/SetMovieActivity", movie);
  }
  addEvent(event: MovieEventForBackend)  {
    console.log("adding Event");
    console.log(event)
    return this.http.post<boolean>("/api/addEvent", event);
  }
  updateEvent(event: MovieEventForBackend){
    console.log("updating Event");
    console.log(event)
    return this.http.post<boolean>("/api/updateEvent", event);
  }
  deleteEvent(id: number){
    console.log("deleting Event");
    return this.http.post<boolean>("/api/setEventInactive", id);
  }
  login(user : User) : Observable<User> {
    console.log("trying to login user");
    console.log(user);
    return this.http.post<User>("/api/user",user);
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

  getBookingsForEmail(email: string){
    return this.http.post<BookingInfo[]>("/api/bookingsForUser", email);
  }

  //Booking Stuff End

  addCustomer(customer: Customer){
    console.log("adding Customer");
    console.log(customer)
    return this.http.post<Customer>("/api/addCustomer", customer);
  }
}
