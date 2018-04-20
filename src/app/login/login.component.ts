import { Component, OnInit } from '@angular/core';
export interface Person {
    login: string;
    pass: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
  }

  logined:boolean = false;

  onSubmit(person: Person){
    this.logined = person.login === 'wise' && person.pass === 'wise' ? true : false;
  }
}
