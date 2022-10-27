import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';
import { Customer } from '../customer';
import { MovieService } from '../movie.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { User } from '../user';






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
  acceptedAGB: boolean = false;

  readonly snackBarDuration : number = 1500;


  constructor(    private movieService: MovieService,
    private router: Router,
    private _snackBar: MatSnackBar,



    ) { }




  ngOnInit(): void {
  }

  onPressAddUser() {
    if(this.enteredEmail != "" && this.enteredFirstName != "" && this.enteredName != "" && this.enteredPassword != "" && this.selectedDate != new Date() && this.selectedDate != null && this.acceptedAGB == true){
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.movieService.addCustomer({userType: "Customer", mailAdress: this.enteredEmail, lastName : this.enteredName, firstName: this.enteredFirstName, birthDate: this.selectedDate, postalCode: 67654, houseNumber: 4, location: "Osthofen", street: "myStreet", countryCode: "DE", mobileNumber: "0234324", password: this.enteredPassword}).subscribe(
          data => {
            if(data.userType == "UserExists"){
              this._snackBar.open("Account zu dieser Email Adresse existiert bereits", "Okay")
            }
            else{
              HeaderComponent.currentUser = data;
              localStorage.setItem('currentUser', JSON.stringify(data));
              let currentSnackbar : any = this._snackBar.open("Registrierung und Anmeldung waren erfolgreich", "Okay")
              setTimeout(() => {
                currentSnackbar.dismiss();
              }, this.snackBarDuration)
              this.router.navigate(['dashboard']);
              console.log(data)
              console.log(HeaderComponent.currentUser)
            }
           
            resolve(0);
          }
          )
        }, 0)
      })
    }
    else{
      this._snackBar.open("Daten fehlerhaft", "Okay")
    }
  return;
    let newCustomer: Customer;
  }

}
