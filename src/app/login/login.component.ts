import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  ngOnInit() {
  }

    logined = false;

    onSubmit(person: Person){
      console.log(person);
      this.logined = person.login === 'wise' && person.pass === 'wise' ? true : false;
  }



}
export interface Person {
    login: string;
    pass: string;
}