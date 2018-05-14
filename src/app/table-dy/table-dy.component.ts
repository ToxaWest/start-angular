import { Component, NgModule, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog,  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ELEMENT_DATA } from './mock-table-dy';
import {Element} from './table-dy';

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
    selectedUser: Element;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    constructor(public dialog: MatDialog) {}

    openDialog(element: Element): void {
        let dialogRef = this.dialog.open(TableDyModalDialog, {
            width: '600px',
            data: element
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
@Component({
    selector: 'app-table-dy-content-modal',
    templateUrl: './table-dy-popup.html'
})
export class TableDyModalDialog {

    constructor(
        public dialogRef: MatDialogRef<TableDyModalDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}