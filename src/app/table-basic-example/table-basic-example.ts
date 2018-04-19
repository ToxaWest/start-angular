import {Component, NgModule, AfterViewInit, ViewChild, OnInit} from '@angular/core';
import {MatSort, MatPaginator, MatTableDataSource, MatDialog} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import { ELEMENT_DATA } from '../mock-table';
import { Element } from '../table';

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
    selectedUser: Element;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    constructor(public dialog: MatDialog) {}

    openDialog() {
        console.log('asd');
        const dialogRef = this.dialog.open(TableModalDialog, {
            height: '650px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    onSelect(element: Element): void {
        // this.openDialog();
        this.selectedUser = element;
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
@Component({
    selector: 'app-table-content-modal',
    templateUrl: './table-popup.html'
})
export class TableModalDialog implements OnInit  {}
