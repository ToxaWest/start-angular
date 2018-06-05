import {Component, NgModule, ViewChild, Inject, OnInit} from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog,  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import {Element} from './table-dy';
import {TableDyService} from './table-dy.service';
import 'rxjs/add/operator/toPromise';
import {PdfToPrintTestComponent} from '../pdf-to-print-test/pdf-to-print-test.component';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';

@NgModule({
    exports: [
        CdkTableModule,
    ]
})
@Component({
    selector: 'app-table-dy',
    styleUrls: ['table-dy.component.css'],
    templateUrl: 'table-dy.component.html',
    providers: [TableDyService],
})
export class TableDyComponent implements OnInit {

    displayedColumns = ['select'];
    dataSource;
    selected = [];
    Users: any;
    data: any;
    structure: any;
    selectedAction: any;
    pdfTemplates;
    actions;
    checkbox: boolean;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    constructor(
        public dialog: MatDialog,
        private tableDyService: TableDyService,
        private router: Router
    ) {}

    getTableDy(): void {
        this.tableDyService.getTableDy()
            .subscribe(
                (data) => {
                    this.data = data;
                    this.structure = this.data.structure;
                    this.getDisplayColumns(this.data.structure);
                    this.dataSource = new MatTableDataSource(this.data.results);
                    this.Users = this.data.results;
                    this.AfterViewInit();

                }
            );
    }

    getTableDyTemplate(): void {
        this.tableDyService.getTableDyTemplate()
            .subscribe(pdfTemplates => this.pdfTemplates = pdfTemplates);
    }

    getDisplayColumns(columns) {
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].visible) {
            this.displayedColumns.push(columns[i].name);
          }
        }
    }

    getTableDyActions(): void {
        this.tableDyService.getTableDyActions()
            .subscribe(actions => this.actions = actions);
    }

    selectAll(checked) {
        this.checkbox = checked;
        if (checked) {
            this.selected = this.Users;
        } else {
            this.selected = [];
        }
    }

    selectedToPdf(element: Element) {
        const ElementSelect = this.selected.indexOf(element);
        ElementSelect !== -1 ?
            this.selected.splice(ElementSelect , 1) :
            this.selected.push(element);
    }

    UserAction(): void {
        const putUsers = {'did': []};
        for (let i = 0; i < this.selected.length; i++) {
            putUsers.did.push(this.selected[i].did);
        }
        this.tableDyService.updateTableDy(putUsers)
            .subscribe(() => this.router.navigateByUrl('/state-of-claim'));
    }

    ngOnInit() {
        this.getTableDy();
        this.getTableDyTemplate();
        this.getTableDyActions();
    }

    openDialog(element: Element): void {
        const dialogRef = this.dialog.open(TableDyModalDialogComponent, {
            width: '600px',
            data: element
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    PrintPdf(): void {
        PdfToPrintTestComponent.getSelectedPdf(this.pdfTemplates[0]);
        PdfToPrintTestComponent.getUsersPdf(this.selected);
        this.router.navigateByUrl('/pdf-to-print');
    }

    AfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }
}
@Component({
    selector: 'app-table-dy-content-modal',
    templateUrl: './table-dy-popup.html'
})
export class TableDyModalDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<TableDyModalDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }
}
