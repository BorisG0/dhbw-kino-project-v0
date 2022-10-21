import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppComponent } from '../app.component';



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




  ngOnInit(): void {
  }

  onPressAddUser()  {
    console.log(this.enteredFirstName + this.selectedDate + this.enteredName + this.enteredEmail + this.enteredPassword)
  }

}
