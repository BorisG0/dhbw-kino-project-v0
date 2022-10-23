import { Component, Input } from '@angular/core';
import { SeatInEvent } from '../seatInEvent';
import { Ticket } from '../ticket';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent{

  @Input() seat: Ticket | undefined;

}
