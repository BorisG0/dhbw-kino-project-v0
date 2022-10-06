import { Component, OnInit } from '@angular/core';

import { SeatInEvent } from '../seatInEvent';
import { MovieEvent } from '../MovieEvent';
import { SEATS } from '../mock-seats';

import { MovieService } from '../movie.service';
import { Time } from '@angular/common';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  seats: SeatInEvent[][] = SEATS;
  eventId: number = 1;

  seatsInEvent :SeatInEvent[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.getSeats();
  }

  getSeats(){
    this.movieService.getSeatsInEventId(this.eventId).subscribe(data =>{
      this.seatsInEvent = data
      console.log(data)
    });
  }

  seatClicked(seat: SeatInEvent){
    seat.status = (seat.status - 1) * (seat.status - 1);
  }

}
