import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Movie } from './movie';
import { MOVIES } from './mock-movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor() { }

  getMovies(): Observable<Movie[]> {
    const movies = of(MOVIES);
    return movies;
  }

  getMovie(id: number): Observable<Movie> {
    const movie = MOVIES.find(m => m.id === id)!;
    return of(movie);
  }
}
