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
  selectedDate: Date = new Date();

  enteredFirstName: string = "";
  enteredName: string = "";
  enteredEmail: string = "";
  enteredPassword: string = "";

  constructor(    private movieService: MovieService

    ) { }




  ngOnInit(): void {
  }

  onPressAddUser() {
    console.log(this.enteredFirstName + this.selectedDate + this.enteredName + this.enteredEmail + this.enteredPassword)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.movieService.addCustomer({mailAdress: this.enteredEmail, password: this.enteredPassword, lastName : this.enteredName, date: this.selectedDate, postalcode: 67654, houseNumber: 4, location: "Osthofen", street: "myStreet", countryCode: "DE", mobileNumber: "0234324"}).subscribe(
        data => {
          console.log(data)

          resolve(0);
        }
        )


      }, 0)
    })
    let newCustomer: Customer;
  }

}
