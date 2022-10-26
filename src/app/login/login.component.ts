import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeaderComponent } from '../header/header.component';
import { MovieService } from '../movie.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
inputMail : string ="";
inputPassword : string="";
  constructor(    private movieService: MovieService,
    private _snackBar: MatSnackBar

    ) { }

  ngOnInit(): void {
  }
  onPressLogin(){
    if(this.inputMail !="" && this.inputPassword !=""){
      return new Promise((resolve, reject) => {
        setTimeout(() => {
            this.movieService.login({userType: "Employee", mailAdress: this.inputMail, password:this.inputPassword, lastName: "", firstName: ""}).subscribe(
              data => {
                if(data.userType != "NoUserFound"){
                  HeaderComponent.currentUser = data;
                  localStorage.setItem('currentUser', JSON.stringify(data));
                  this._snackBar.open("Anmeldung erfolgreich", "Okay")
                }
                else{
                  this._snackBar.open("Kein Account zu den angegebenen Daten gefunden", "Okay")
                }
                resolve(0);
              }
            );
          
        }, 0)
      })
    }
    else{
      this._snackBar.open("Alle Felder müssen ausgefüllt sein", "Okay")
    }
    return;
  }

}
