import { Component, OnInit } from '@angular/core';

import { User } from '../_models';
import { UserService } from '../_services';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
    currentUser: User;
    public userData;
    // users: User[] = [];

    constructor(private userService: UserService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.userData = JSON.parse(this.currentUser.data)[0];
    }

    ngOnInit() {
        // this.userData = JSON.parse(this.currentUser.data)[0];
        console.log(this.userData);
        // this.loadAllUsers();
    }
    //
    // deleteUser(id: number) {
    //     this.userService.delete(id).subscribe(() => { this.loadAllUsers(); });
    // }
    //
    // private loadAllUsers() {
    //     this.userService.getAll().subscribe(users => { this.users = users; });
    // }
}
