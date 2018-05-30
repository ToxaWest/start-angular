import { Injectable } from '@angular/core';
import {Element} from './table';
import {ELEMENT_DATA} from './mock-table';

@Injectable()
export class TableBasicService {

    static getUsers(): Promise<Element[]> {
        return Promise.resolve(ELEMENT_DATA);
    }

    getUsersSlowly(): Promise<Element[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(TableBasicService.getUsers()), 1000);
        });
    }

}
