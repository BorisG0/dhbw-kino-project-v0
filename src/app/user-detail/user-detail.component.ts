import { Component, OnInit } from '@angular/core';
import { BookingInfo } from '../bookingInfo';
import { HeaderComponent } from '../header/header.component';
import { User } from '../user';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;
  bookingInfos: BookingInfo[] = [];

  constructor(private movieService: MovieService) { }

  ngOnInit(): void {
    this.user = HeaderComponent.currentUser;
    this.getBookingInfos(this.user.mailAdress);
  }

  getBookingInfos(email: string){
    this.movieService.getBookingsForEmail(email).subscribe(data =>{
      this.bookingInfos = data;
    });
  }

  logout(){
    HeaderComponent.currentUser = {userType: "",
    mailAdress: "",
    password: "",
    lastName: "",
    firstName: ""};

    localStorage.removeItem('currentUser');
  }

}
