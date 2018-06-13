import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {MenuItems} from '../_models';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class MenuItemsService {

    private menuItemsUrl = 'http://217.12.219.175:3080/menu_items';

    constructor(private http: HttpClient) { }

    getMenuItems(): Observable<MenuItems[]> {
        return this.http.get<MenuItems[]>(this.menuItemsUrl);
    }

}
