import { Injectable } from '@angular/core';
import {Element} from '../table';
import {ELEMENT_DATA} from '../mock-table';

@Injectable()
export class TableBasicService {

    getUsers(): Promise<Element[]> {
        return Promise.resolve(ELEMENT_DATA);
    }

    getUsersSlowly(): Promise<Element[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.getUsers()), 5000);
        });
    }

}
