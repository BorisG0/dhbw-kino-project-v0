import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-program',
  templateUrl: './employee-program.component.html',
  styleUrls: ['./employee-program.component.css']
})
export class EmployeeProgramComponent implements OnInit {
  movies: Movie[] = [];
  displayedColumns: string[] = ['title', 'duration', 'genre', 'fsk', 'cast', 'regie', 'studio', 'date', 'description', 'symbol','active'];
  constructor(private movieService: MovieService,
    private router: Router,
    ) {
   }
  ngOnInit(): void {
    if(HeaderComponent.currentUser.userType != 'Employee'){
      this.router.navigate(['dashboard']);

    }
    else{
      this.getMoviesForEmployees();
    }
  }
  //Alle Filme laden
  getMoviesForEmployees(): void{
    this.movieService.getMoviesForEmployees().subscribe(movies =>{
      this.movies = movies;
    } );
  }

}
