import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Booking } from '../booking';
import { MovieService } from '../movie.service';
import { HeaderComponent } from '../header/header.component';
import { User } from '../user';
import { BookingInfo } from '../bookingInfo';
import { MovieEvent } from '../MovieEvent';
import { Movie } from '../movie';


@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent implements OnInit {
  link : string = "";
  currentuser : User = HeaderComponent.currentUser;
  eventid : number = -1;
  bookingInfos: BookingInfo[] = [];
  currentBookingInfo : BookingInfo | undefined;
  movie : Movie | undefined;

  readonly snackBarDuration : number = 1500;


  @Input() bookingInfo: Booking | undefined;
  @Input() movieEventInfo: MovieEvent | undefined;


  constructor(    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private movieService: MovieService

    ) { }

  ngOnInit(): void {
    if(this.bookingInfo != undefined){
      this.eventid = this.bookingInfo?.eventId;
    }
    if(this.route.snapshot.routeConfig?.path!=undefined){
      this.link = this.route.snapshot.routeConfig?.path
    }
      let currentSnackbar : any = this._snackBar.open("Danke fürs buchen, eine Email wurde an Sie verschickt", "Okay");
      setTimeout(() => {
        currentSnackbar.dismiss();
      }, this.snackBarDuration)

    
    this.getBookingInfos(HeaderComponent.currentUser.mailAdress)
    this.getMovie()

  }

  getBookingInfos(email: string){
    this.movieService.getBookingsForEmail(email).subscribe(data =>{
      this.bookingInfos = data;
      this.currentBookingInfo = data[data.length-1];
    });
  }
  getMovie() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if(this.movieEventInfo!=null)        
        this.movieService.getMovie(this.movieEventInfo?.movieId).subscribe(movie =>{
          this.movie = movie;
          resolve(0)
          })
      }, 0)
    })
  }

}
