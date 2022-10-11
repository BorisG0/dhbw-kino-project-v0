import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';


@Component({
  selector: 'app-employee-program',
  templateUrl: './employee-program.component.html',
  styleUrls: ['./employee-program.component.css']
})
export class EmployeeProgramComponent implements OnInit {
  movies: Movie[] = [];
  displayedColumns: string[] = ['Titel', 'Genre', 'FSK', 'Events'];



  constructor(private movieService: MovieService) {
    
   }

  ngOnInit(): void {
    this.getMovies();
  }
  getMovies(): void{
    this.movieService.getMovies().subscribe(movies =>{
      this.movies = movies;
    } );
  }
  onSelectRow(row: Movie){
console.log(row);
  }
  onClickEvents(){
    console.log("button")
  }
}
