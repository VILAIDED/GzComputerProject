import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor() { 
    let token = localStorage.getItem("JWT");
    let parseJwt = JSON.parse(atob(token.split('.')[1]));
    this.name = parseJwt["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
  }

  ngOnInit(): void {
  }

  name:string;

  logout()
  {
    localStorage.removeItem("JWT");
  }
}
