import {Component, NgModule, ViewChild, Inject, OnInit} from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog,  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import {Element, ElementResult} from './table-dy';
import {TableDyService} from './table-dy.service';
import {PdfToPrintTestComponent} from '../pdf-to-print-test/pdf-to-print-test.component';
import {Router} from '@angular/router';
import {SelectionModel} from '@angular/cdk/collections';

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
    Users: any;
    data: any;
    structure: any;
    selectedAction: any;
    pdfTemplates;
    actions;
    selection;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    applyFilter(filterValue: string) {
        console.log(this.dataSource);
        this.dataSource.filter = filterValue.trim().toLowerCase();
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

    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.data.forEach(row => this.selection.select(row));
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

    UserAction(): void {
        const putUsers = {'did': []};
        for (let i = 0; i < this.selection.selected.length; i++) {
            putUsers.did.push(this.selection.selected[i].did);
        }
        this.tableDyService.updateTableDy(putUsers)
            .subscribe(() => this.router.navigateByUrl('/state-of-claim'));
    }

    ngOnInit() {
        this.getTableDy();
        this.getTableDyTemplate();
        this.getTableDyActions();
        this.selection = new SelectionModel<ElementResult>(true, []);
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

    PrintPdf(template): void {
        PdfToPrintTestComponent.getSelectedPdf(template);
        PdfToPrintTestComponent.getUsersPdf(this.selection.selected);
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
