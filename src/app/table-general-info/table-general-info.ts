import {Component, NgModule, ViewChild, Inject, OnInit} from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog,  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { Element } from './table';
import { Template1 } from './template';
import {TableBasicService} from './table-basic.service';

@NgModule({
    exports: [
        CdkTableModule,
    ]
})
@Component({
  selector: 'app-table-basic',
  styleUrls: ['table-general-info.css'],
  templateUrl: 'table-general-info.html',
  providers: [TableBasicService],
})
export class TableComponent implements OnInit {
    selected = [];
    displayedColumns = ['select', 'number', 'stage', 'name', 'date', 'address', 'month', 'debt', 'human', 'privileges', 'privatization'];
    dataSource;
    selectedUser;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    constructor(public dialog: MatDialog, private tableBasicService: TableBasicService ) {}

    openDialog(element: Element): void {
        const dialogRef = this.dialog.open(TableModalDialogComponent, {
            width: '600px',
            data: element
        });
        dialogRef.afterClosed().subscribe(result => {
            this.selectedUser = result;
        });
    }

    getUsers(): void {
        this.tableBasicService.getUsersSlowly()
            .then(dataSource => this.dataSource = new MatTableDataSource(dataSource))
            .then(dataSource => this.AfterViewInit(dataSource))
            .then(selectedUser => this.selectedUser = selectedUser);
    }

    ngOnInit() {
        this.getUsers();
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

    AfterViewInit(data) {
        data.paginator = this.paginator;
        data.sort = this.sort;
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
