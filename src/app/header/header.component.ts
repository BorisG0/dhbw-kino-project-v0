import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user: User | undefined;
  static currentUser: User = {userType: "not",
    mailAdress: "",
    password: "",
    lastName: "",
    firstName: ""};

  constructor() { }

  ngOnInit(): void {
  }

  get currentUser(){
    return HeaderComponent.currentUser;
  }

}
