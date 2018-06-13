import {Component, OnInit} from '@angular/core';
import {User} from './_models';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = '«СМИАД»';
    currentUser: User;
    public userData;

    constructor() {

    }

    ngOnInit() {
        this.addUserInfo();
    }

    addUserInfo() {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
            this.userData = JSON.parse(this.currentUser.data)[0];
        } else {
            this.userData = 'logout';
        }
    }

}
