import { Component, OnInit } from '@angular/core';

import { SeatInEvent } from '../seatInEvent';
import { SEATS } from '../mock-seats';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  seats: SeatInEvent[][] = SEATS;

  constructor() { }

  ngOnInit(): void {
  }

}
