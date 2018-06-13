import {MenuItemsService} from '../_services';
import {MenuItems} from '../_models';
import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-menu-items',
    templateUrl: 'menu.component.html',
    providers: [MenuItemsService]
})

export class MenuComponent implements OnInit {

    menuItems: MenuItems[];

    constructor(
        private menuItemsService: MenuItemsService
    ) {}

    ngOnInit() {
        this.menuItemsService.getMenuItems()
            .subscribe(items => {
                console.log(items);
                this.menuItems = items;
            });
    }
}
