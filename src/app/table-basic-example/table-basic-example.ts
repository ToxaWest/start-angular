import {Component, NgModule, AfterViewInit, ViewChild} from '@angular/core';
import {MatSort, MatPaginator, MatTableDataSource} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import { ELEMENT_DATA } from '../mock-table';

@NgModule({
    exports: [
        CdkTableModule,
    ]
})
@Component({
  selector: 'app-table-basic',
  styleUrls: ['table-basic-example.css'],
  templateUrl: 'table-basic-example.html',
})
export class TableComponent implements AfterViewInit {

    displayedColumns = ['select', 'number', 'stage', 'name', 'date', 'address', 'month', 'debt', 'human', 'privileges', 'privatization'];
    dataSource = new MatTableDataSource(ELEMENT_DATA);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    constructor() { }

    ngAfterViewInit() : void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
