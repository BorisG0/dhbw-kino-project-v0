import { Component, Input } from '@angular/core';
import { Movie } from '../movie';

@Component({
  selector: 'app-movie-clickable',
  templateUrl: './movie-clickable.component.html',
  styleUrls: ['./movie-clickable.component.css']
})
export class MovieClickableComponent {
  @Input() movie: Movie | undefined;
}
