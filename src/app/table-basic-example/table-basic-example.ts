import { Component, NgModule, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog,  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ELEMENT_DATA } from '../mock-table';
import { Element } from '../table';
import { Template1 } from './template';

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
    selected = [];
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

    openDialog(element: Element): void {
        const dialogRef = this.dialog.open(TableModalDialogComponent, {
            width: '600px',
            data: element
        });
        dialogRef.afterClosed().subscribe(result => {
            this.selectedUser = result;
        });
    }

    PrintPdf() {
        Template1.PrintPdf(this.selected);
    }

    selectedToPdf(element: Element) {
        const ElementSelect = this.selected.indexOf(element);
        ElementSelect !== -1 ?
            this.selected.slice(ElementSelect , 1) :
            this.selected.push(element)
        ;
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
export class TableModalDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<TableModalDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
