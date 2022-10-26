import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { User } from '../user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;

  constructor() { }

  ngOnInit(): void {
    this.user = HeaderComponent.currentUser;
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
