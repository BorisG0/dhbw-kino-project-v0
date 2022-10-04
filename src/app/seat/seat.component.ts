import { Component, Input } from '@angular/core';
import { SeatInEvent } from '../seatInEvent';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent{

  @Input() seat: SeatInEvent | undefined;

}
