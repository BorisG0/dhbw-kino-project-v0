import { Component, Input } from '@angular/core';
import { SeatInEvent } from '../seatInEvent';

@Component({
  selector: 'app-seat',
  templateUrl: './seat.component.html',
  styleUrls: ['./seat.component.css']
})
export class SeatComponent{

  @Input() seat: SeatInEvent | undefined;

  clicked(){
    if(this.seat != null)
    this.seat = { row: this.seat.row, numberInRow: this.seat.numberInRow, status: ((this.seat.status - 1) * (this.seat.status - 1))}
  }

}
