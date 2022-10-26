import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Customer } from '../customer';
import { MovieService } from '../movie.service';




@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  selectedDate: any;

  enteredFirstName: String = "";
  enteredName: String="";
  enteredEmail: String="";
  enteredPassword: String="";
  movieService: any;




  ngOnInit(): void {
  }

  onPressAddUser()  {
    let newCustomer: Customer;
    this.movieService.addCustomer(this.enteredFirstName + this.selectedDate + this.enteredName + this.enteredEmail + this.enteredPassword+ ""+ "" + ""+ "" +"" )
    console.log(this.enteredFirstName + this.selectedDate + this.enteredName + this.enteredEmail + this.enteredPassword)
  }

}
