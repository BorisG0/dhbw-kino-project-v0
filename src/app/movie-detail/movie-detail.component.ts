import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';
import { MovieEvent } from '../MovieEvent';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movies: Movie[] = [];
  movie: Movie = {id: 1, title: "placehold", duration: 10, ageRestriction: 0, imageName: 'img0.png', description: '', genre: '', startDate: new Date('0000-00-00'), movieStudio: '', regie: '', cast: '', trailerLink: 'https://www.youtube.com/embed/6DxjJzmYsXo', active: true};
  movieEvents: MovieEvent[] = [];
  movieEventsPerDay: MovieEvent[][] = [];
  safeSrc: SafeResourceUrl | undefined;

  constructor(
    private route: ActivatedRoute,
    private _route: Router,
    private movieService: MovieService,
    private location: Location,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.loadData();
  }
  //Reihenfolge ist wichtig, da die Funktionen Daten von den vorherigen Funktionen benötigen
  async loadData(){
    await this.getMovie();
    await this.getMovieEvents(this.movie);
    await this.getMovies();
    this.loadMovieEventsperDay();
  }
  //Lädt das aktuelle Movie Objekt (welche im Programm ausgewählt wurde)
   getMovie() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.movieService.getMovie(id).subscribe(movie =>{
          this.movie = movie;
          this.movie.trailerLink = this.movie.trailerLink.substring(1, this.movie.trailerLink.length - 1);
          this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl(this.movie.trailerLink);
          resolve(0)
          })
      }, 0)
    })
  }
//Lädt alle Movie Events für den Film, welche innerhalb der nächsten 14 Tage liegen
  getMovieEvents(movie: Movie) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.movieService.getCurrentEventsForMovie(movie.id).subscribe(data =>{
          this.movieEvents = data;
          resolve(0)
        })
      }, 0)
    })
  }
//Lädt alle anderen Filme um so eine schnelle Navigation zwischen den Filmen zu ermöglichen
//Der bereits ausgewählte Film wird nicht mit angezeigt
  getMovies(): void{
    this.movieService.getMovies().subscribe(movies =>{
      //remove current movie from movies array
      movies.splice(this.movie.id-1, 1)
     this.movies = movies
    });
  }
//Die Vorstellungen werden den einzelnen Vorstellungstagen untergeordnet
//Außerdem wird der Wochentag zu den Vorstellungstagen ausgegeben
  loadMovieEventsperDay() {
    let tempArray : MovieEvent[] = [];
    this.movieEvents.forEach(movieEvent => {
      let tempDate: Date = new Date(movieEvent.date);
      movieEvent.weekDay = this.weekDayIndexToString(tempDate.getDay());
      if(tempArray.length>0){
        if(tempArray[0].date == movieEvent.date){
          tempArray.push(movieEvent)
        }
        else{
          this.movieEventsPerDay.push(tempArray)
          tempArray = [];
          tempArray.push(movieEvent);
        }
      }else{
        tempArray.push(movieEvent)
      }
    })
    if(tempArray.length>0){
      this.movieEventsPerDay.push(tempArray)
    }
  }
  //Funktion um Wochentag auszugeben
  weekDayIndexToString(dayOfWeek: number){
    const weekDays: string[] = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
    return weekDays[dayOfWeek];
  }

  //Beim wechseln der FIlme wird die Seite neu geladen aber die erzeugten div Container für die Vorstellungen wurden nicht gelöscht, weshalb die Container (bis zu 100) in der For Schleife gelöscht werden
  //ToDo: Schönere Lösung für das Problem
  changedMovie(movieId: number) {
    this._route.navigate(['/detail/'+movieId]);
    var element: any = '';
    for(let i = 0; i<100; i++){
      element = document.getElementById("eventDays-"+i);
      if(element!=null){
        element!.parentNode.removeChild(element)
      }
    }
    this.ngOnInit();
  }






}
