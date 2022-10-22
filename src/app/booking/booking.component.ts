import { Component, OnInit } from '@angular/core';

import { SeatInEvent } from '../seatInEvent';
import { MovieEvent } from '../MovieEvent';
import { SEATS } from '../mock-seats';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MovieService } from '../movie.service';

import { Booking } from '../booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  seats: SeatInEvent[][] = SEATS;
  eventId: number = 1;
  movieEvent: MovieEvent | undefined;
  
  statusChangeSuccessfull: boolean = false;

  seatsInEvent :SeatInEvent[] = [];

  selectedSeats: SeatInEvent[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  async loadData(){
    this.getMovieEvent();
    await this.getSeats();
    this.splitSeatsByRows();
  }

  getMovieEvent(){
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.movieService.getEventById(id).subscribe(data => {
      this.movieEvent = data;
    })
  }

  getSeats(){
    console.log("getSeats");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const id = Number(this.route.snapshot.paramMap.get('id'))
        this.movieService.getSeatsInEventId(id).subscribe(data =>{
          this.seatsInEvent = data;
          console.log(data);
          resolve(0);
        });
      }, 0)
    })
  }

  splitSeatsByRows(){
    console.log("splitSeatsByRows");
    this.seats = [];
    let tempArray: SeatInEvent[] = [];

    this.seatsInEvent.forEach(seat => {
      if(this.selectedSeats.filter(s => s.seatId == seat.seatId).length > 0){
        seat.status = 3;
      }

      if(tempArray.length > 0){
        if(tempArray[0].row == seat.row){
          tempArray.push(seat);
        }else{
          this.seats.push(tempArray);
          tempArray = [];
          tempArray.push(seat);
        }
      }else{
        tempArray.push(seat);
      }
    })

    if(tempArray.length > 0){
      this.seats.push(tempArray);
    }
  }

  async seatClicked(seat: SeatInEvent){
    if(this.selectedSeats.filter(s => s.seatId == seat.seatId).length > 0) return;

    console.log("clicked: " + seat.row + seat.numberInRow);
    this.selectedSeats.push(seat);
    await this.changeSeatStatus(seat);
    this.loadData();
  }

  changeSeatStatus(seat: SeatInEvent){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const id = Number(this.route.snapshot.paramMap.get('id'))
        this.movieService.setSeatInEventStatus({row: seat.row,
          numberInRow: seat.numberInRow, status: 2, seatId: seat.seatId, eventId: seat.eventId}).subscribe(
          data => {
            this.statusChangeSuccessfull = data;
            resolve(0);
          }
        );
      }, 0)
    })
  }

  clearSelectedSeats(){
    this.selectedSeats.forEach(seat => {
      this.movieService.setSeatInEventStatus({row: seat.row,
        numberInRow: seat.numberInRow, status: 0, seatId: seat.seatId, eventId: seat.eventId}).subscribe(
        data => {
          this.statusChangeSuccessfull = data;
        }
      );
    })

    window.location.reload();
  }

  bookSeats(){
    console.log("booking seats");
    console.log(this.selectedSeats);
    if(this.selectedSeats.length == 0){
      console.log("no selected seats");
      return;
    }
    let seatIds: number[] = [];
    this.selectedSeats.forEach(seat => {
      seatIds.push(seat.seatId);
    });
    let booking: Booking = {id: 0, eventId: this.eventId, seatIds: seatIds};
    console.log(booking);
  }

}
