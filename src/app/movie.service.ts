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
    return this.http.post<MovieEvent>("/api/eventById", id);
  }

  getSeatsInEventId(eventId: number){
    return this.http.post<SeatInEvent[]>("/api/seatsInEvent", eventId);
  }

  setSeatInEventStatus(seatInEvent: SeatInEvent){
    return this.http.post<boolean>("/api/setStatusForSeatInEvent", seatInEvent);
  }

  addMovie(movie: Movie){
    return this.http.post<boolean>("/api/addMovie", movie);
  }
  
  updateMovie(movie: Movie){
    return this.http.post<boolean>("/api/updateMovie", movie);
  }
  changeMovieActivity(movie: Movie){
    return this.http.post<boolean>("/api/SetMovieActivity", movie);
  }
  addEvent(event: MovieEventForBackend)  {
    return this.http.post<boolean>("/api/addEvent", event);
  }
  updateEvent(event: MovieEventForBackend){
    return this.http.post<boolean>("/api/updateEvent", event);
  }
  deleteEvent(id: number){
    return this.http.post<boolean>("/api/setEventInactive", id);
  }
  login(user : User) : Observable<User> {
    return this.http.post<User>("/api/user",user);
  }

  //Booking Stuff Start
  newBooking(booking: BookingCreation){
    return this.http.post<boolean>("/api/newBooking", booking);
  }

  getTicketsInEventId(eventId: number){
    return this.http.post<Ticket[]>("/api/ticketsInEvent", eventId);
  }

  setStatusForTicket(statusChange: StatusChange){
    return this.http.post<boolean>("/api/setStatusForTicket", statusChange);
  }

  getBookingsForEmail(email: string){
    return this.http.post<BookingInfo[]>("/api/bookingsForUser", email);
  }

  //Booking Stuff End

  addCustomer(customer: Customer){

    return this.http.post<Customer>("/api/addCustomer", customer);
  }
}
