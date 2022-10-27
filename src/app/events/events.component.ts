import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { Movie } from '../movie';
import { MovieEvent } from '../MovieEvent';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {
  movies: Movie[] = [];
  movie: Movie = { id: 1, title: "placehold", duration: 10, ageRestriction: 0, imageName: 'img0.png', description: '', genre: '', startDate: new Date('0000-00-00'), movieStudio: '', regie: '', cast: '', trailerLink: 'https://www.youtube.com/embed/6DxjJzmYsXo', active: true };
  movieEvents: MovieEvent[] = [];
  movieEventsPerDay: MovieEvent[][] = [];
  safeSrc: SafeResourceUrl | undefined;
  displayedColumns: string[] = ['room', 'date', 'time'];
  inputRoomid: number | undefined;
  inputMovieid: number | undefined;
  inputEventid: number | undefined;
  inputDate: Date = new Date();
  //Zeit wird zwischen durch angepasst -> Der Nutzer soll die Zeit ohne Sekunden sehen und das Backend fordert die Zeit mit Sekunden an
  inputTime: string = "";
  timeWithSec: string = "";
  movieId: number = -1;
  eventId: number = -1;
  inEditEvents: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    //Schaut ob man sich in der Vorstellung bearbeiten oder Vorstellung hinzufügen Ansicht befindet
    if (this.route.snapshot.routeConfig?.path?.includes('edit')) {
      this.inEditEvents = true
    };
    this.loadData();
  }

  async loadData() {
    //In der Vorstellung hinzufügen Ansicht werden der aktuelle Film und die dazugehörigen Vorstellungen geladen
    if (this.inEditEvents == false) {
      this.movieId = Number(this.route.snapshot.paramMap.get('mId'));
      await this.getMovie();
      await this.getMovieEvents(this.movie);
    }
    //In der Vorstellung bearbeiten Ansicht wird die ausgewählt Vorstellung geladen
    else {
      this.eventId = Number(this.route.snapshot.paramMap.get('eId'));
      await this.getEvent();
    }
  }
  //Lädt die ausgewählte Vorstellung und befüllt die Input Felder
  getEvent() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.movieService.getEventById(this.eventId).subscribe(event => {
          this.movieId = event.movieId;
          this.inputDate = event.date;
          this.inputRoomid = event.roomId;
          this.timeWithSec = event.time;
          this.inputTime = event.time.slice(0, -3)
          resolve(0)
        })
      }, 0)
    })
  }
  //Lädt den aktuellen Film
  getMovie() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.movieId = Number(this.route.snapshot.paramMap.get('id'));
        this.movieService.getMovie(this.movieId).subscribe(movie => {
          this.movie = movie;
          resolve(0)
        })
      }, 0)
    })
  }
  //Lädt die Vorstellungen zu dem aktuellen Film
  getMovieEvents(movie: Movie) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.movieService.getEventsForMovie(movie).subscribe(data => {
          this.movieEvents = data;
          resolve(0)
        })
      }, 0)
    })
  }
  //Film bearbeiten
  onPressUpdate() {
    if (this.inputDate != undefined && this.inputTime != undefined && this.inputRoomid != undefined) {
      this.timeWithSec = this.inputTime + ":00";
      //Zeiten mit Einstelligen Werten für die Stunde werden eine Null vorangestellt
      if (this.timeWithSec.length == 7) {
        this.timeWithSec = "0" + this.timeWithSec;
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.inputRoomid != undefined && this.inputDate != undefined && this.timeWithSec != undefined) {

            this.movieService.updateEvent({ id: this.eventId, date: this.inputDate, time: this.timeWithSec, movieId: this.movieId, roomId: this.inputRoomid }).subscribe(
              data => {
                resolve(0);
              }
            );
          }

        }, 0)
      })
    }
    return;
  }
  //Vorstellung erzeugen
  onPressCreate() {
    if (this.inputDate != undefined && this.inputTime != undefined && this.inputRoomid != undefined) {
      this.timeWithSec = this.inputTime + ":00";
      //Zeiten mit Einstelligen Werten für die Stunde werden eine Null vorangestellt
      if (this.timeWithSec.length == 7) {
        this.timeWithSec = "0" + this.timeWithSec;
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (this.inputRoomid != undefined && this.inputDate != undefined && this.timeWithSec != undefined) {
            this.movieService.addEvent({ id: -1, date: this.inputDate, time: this.timeWithSec, movieId: this.movieId, roomId: this.inputRoomid }).subscribe(
              data => {
                resolve(0);
              }
            );
          }
        }, 0)
      })
    }
    return;
  }
  //Vorstellung löschen bzw. inaktiv setzen
  onPressDelete() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(this.eventId)
        this.movieService.deleteEvent(this.eventId).subscribe(
          data => {
            resolve(0);
          }
        );
      }, 0)
    })
  }

}
