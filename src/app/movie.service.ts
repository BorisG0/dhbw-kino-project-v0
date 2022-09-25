import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { MessageService } from './message.service';

import { Movie } from './movie';
import { MovieEvent } from './MovieEvent';
import { MOVIES } from './mock-movies';

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

  getEventsForMovie(movie: Movie){
    this.messageService.add(`getting events for movie ${movie.id}`);
    return this.http.post<MovieEvent[]>("/api/eventsformovie", movie);
  }
}
