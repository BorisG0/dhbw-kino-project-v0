import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MovieService } from '../movie.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(    private movieService: MovieService,
    ) { }

  ngOnInit(): void {
  }
  onPressLogin(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
          this.movieService.login({userType: "Employee", mailAdress: "aberger3@posterous.com", password:"MiBtueRSa", lastName: "", firstName: ""}).subscribe(
            data => {
              this.movieService.setUser(data);
              console.log(this.movieService.getUser());
              HeaderComponent.currentUser = data;
              console.log(data)
              resolve(0);
            }
          );
        
      }, 0)
    })
  }

}
