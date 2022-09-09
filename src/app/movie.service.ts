import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { MessageService } from './message.service';

import { Movie } from './movie';
import { MOVIES } from './mock-movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private messageService: MessageService) { }

  getMovies(): Observable<Movie[]> {
    const movies = of(MOVIES);
    this.messageService.add('MovieService: fetched Movies');
    return movies;
  }

  getMovie(id: number): Observable<Movie> {
    const movie = MOVIES.find(m => m.id === id)!;
    this.messageService.add('MovieService: fetched Movie')
    return of(movie);
  }
}
