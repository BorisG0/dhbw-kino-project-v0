import { Component, OnInit } from '@angular/core';
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
    ) { }

  ngOnInit(): void {
  }
  onPressLogin(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          this.movieService.login({userType: "Employee", mailAdress: this.inputMail, password:this.inputPassword, lastName: "", firstName: ""}).subscribe(
            data => {
              HeaderComponent.currentUser = data;
              console.log(data)
              localStorage.setItem('currentUser', JSON.stringify(data));
              resolve(0);
            }
          );
        
      }, 0)
    })
  }

}
