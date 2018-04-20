import { Component, NgModule, AfterViewInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ELEMENT_DATA } from '../mock-table-dy';

@NgModule({
    exports: [
        CdkTableModule,
    ]
})
@Component({
    selector: 'app-table-dy',
    styleUrls: ['table-dy.component.css'],
    templateUrl: 'table-dy.component.html',
})
export class TableDyComponent implements AfterViewInit {

    displayedColumns = ['date', 'name', 'address', 'debt', 'actions'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}