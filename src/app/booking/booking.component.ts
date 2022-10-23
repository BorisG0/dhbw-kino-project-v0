import { Component, OnInit } from '@angular/core';

import { SeatInEvent } from '../seatInEvent';
import { MovieEvent } from '../MovieEvent';
import { SEATS } from '../mock-seats';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { MovieService } from '../movie.service';

import { Booking } from '../booking';
import { BookingCreation } from '../BookingCreation';

import { Ticket } from '../ticket';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  tickets: Ticket[] = [];
  ticketsByRow : Ticket [][] = [];


  seats: SeatInEvent[][] = SEATS;
  eventId: number = 1;
  movieEvent: MovieEvent | undefined;
  
  statusChangeSuccessfull: boolean = false;

  bookingSuccessfull: boolean = false;

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

    await this.getTickets();
    this.splitTicketsByRow();
  }

  getMovieEvent(){
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.movieService.getEventById(id).subscribe(data => {
      this.movieEvent = data;
    })
  }

  getSeats(){
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

  getTickets(){
    console.log("getTickets() called");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const id = Number(this.route.snapshot.paramMap.get('id'))
        this.movieService.getTicketsInEventId(id).subscribe(data =>{
          this.tickets = data;
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

  splitTicketsByRow(){
    console.log("splitSeatsByRows");
    this.ticketsByRow = [];
    let tempArray: Ticket[] = [];

    this.tickets.forEach(ticket => {

      if(tempArray.length > 0){
        if(tempArray[0].row == ticket.row){
          tempArray.push(ticket);
        }else{
          this.ticketsByRow.push(tempArray);
          tempArray = [];
          tempArray.push(ticket);
        }
      }else{
        tempArray.push(ticket);
      }
    })

    if(tempArray.length > 0){
      this.ticketsByRow.push(tempArray);
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

  async bookSeatsClicked(){
    if(this.selectedSeats.length == 0){
      console.log("no selected seats");
      return;
    }

    await this.createBooking();
    this.selectedSeats = [];
    this.loadData();
  }

  createBooking(){
    console.log("creating booking");
    if(this.selectedSeats.length == 0){
      console.log("no selected seats");
      return;
    }
    
    let ticketIds: number[] = [];

    this.selectedSeats.forEach(seat => {
      ticketIds.push(seat.seatId);
    })

    let bookingCreation: BookingCreation = {email: "aberger3@posterous.com", ticketIds: ticketIds};

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.movieService.newBooking(bookingCreation).subscribe(
          data => {
            this.statusChangeSuccessfull = data;
            resolve(0);
          }
        );
      }, 0)
    })

  }

  ticketClicked(ticked: Ticket){
    
  }

}
