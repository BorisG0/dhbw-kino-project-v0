import { Component, OnInit } from '@angular/core';

import { Seat } from '../seat';
import { SEATS } from '../mock-seats';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  seats: Seat[][] = SEATS;

  constructor() { }

  ngOnInit(): void {
  }

}
