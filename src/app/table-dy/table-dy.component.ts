import {Component, NgModule, ViewChild, Inject, OnInit} from '@angular/core';
import {MatSort, MatPaginator, MatTableDataSource, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {CdkTableModule} from '@angular/cdk/table';
import {Table, TableResult} from '../_models';
import {TableDyService} from '../_services';
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
    filteredData: { [k: string]: any } = {};

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    applyFilter(column: string, filterValue: any) {
        if (this.filteredData.hasOwnProperty(column)) {
            if (filterValue === undefined) {
                this.filteredData[column] = '';
            } else {
                this.filteredData[column] = filterValue.trim().toLowerCase();
            }
        }
        const _this = this;
        this.dataSource.filterPredicate = function (data: TableResult) {
            let result = 1;
            _this.structure.forEach(function (el) {
                if (el.visible) {

                    if (data.hasOwnProperty(el.name) && _this.filteredData.hasOwnProperty(el.name)) {
                        const _res = (data[el.name].toString().trim().toLowerCase().indexOf(_this.filteredData[el.name]) !== -1);

                        result = result * (_res ? 1 : 0);
                    }

                }
            });
            return result;
        };
        this.dataSource.filter = 'remove default filter';
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
        const numRows = this.dataSource.filteredData.length > 0 ?
            this.dataSource.filteredData.length :
            this.dataSource.data.length;
        return numSelected === numRows;
    }

    masterToggle() {
        this.isAllSelected() ?
            this.selection.clear() :
            this.dataSource.filteredData.length > 0 ?
                this.dataSource.filteredData.forEach(row => this.selection.select(row)) :
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
                this.filteredData[columns[i].name] = ``;
            }
        }
    }

    getTableDyActions(): void {
        this.tableDyService.getTableDyActions()
            .subscribe(actions => this.actions = actions);
    }

    UserAction(): void {
        this.actionDialog(this.selection.selected);
    }

    ngOnInit() {
        this.getTableDy();
        this.getTableDyTemplate();
        this.getTableDyActions();
        this.selection = new SelectionModel<TableResult>(true, []);
    }

    openDialog(element: Table): void {
        const dialogRef = this.dialog.open(TableDyModalDialogComponent, {
            width: '600px',
            data: element
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    actionDialog(element: TableResult): void {
        const actionDialogRef = this.dialog.open(ActionDialogComponent, {
            width: '800px',
            data: element
        });
        actionDialogRef.afterClosed().subscribe(result => {
            if (result === 'confirm') {
                const putUsers = {'did': []};
                for (let i = 0; i < this.selection.selected.length; i++) {
                    putUsers.did.push(this.selection.selected[i].did);
                }
                this.tableDyService.updateTableDy(putUsers)
                    .subscribe(() => this.router.navigateByUrl('/claim_order_request'));
            }
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
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}


@Component({
    selector: 'app-to-action.component',
    templateUrl: './to-action.component.html'
})
export class ActionDialogComponent {

    constructor(
        public dialogRef: MatDialogRef<ActionDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    save(): void {
        this.dialogRef.close('confirm');
    }

    onNoClick(): void {
        this.dialogRef.close('close');
    }
}
