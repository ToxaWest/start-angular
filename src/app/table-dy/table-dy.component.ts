import {Component, NgModule, ViewChild, Inject, OnInit} from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog,  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import {Element} from './table-dy';
import {TableDyService} from './table-dy.service';
import 'rxjs/add/operator/toPromise';
import {PdfToPrintTestComponent} from '../pdf-to-print-test/pdf-to-print-test.component';
import {Router} from '@angular/router';

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
    Users:any;
    data:any;
    structure:any;
    pdfTemplates;
    actions;
    checkbox:boolean;

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase();
        this.dataSource.filter = filterValue;
    }

    constructor(
        public dialog: MatDialog,
        private tableDyService:TableDyService,
        private router: Router
    ) {}

    getTableDy(): void {
        this.tableDyService.getTableDy().toPromise()
            .then(data => this.data = data)
            .then(() => this.dataSource = new MatTableDataSource(this.data.results))
            .then(() => this.AfterViewInit(this.data.results))
            .then(() => this.structure = this.data.structure)
            .then(() => this.Users = this.dataSource.data )
            .then(() => this.getDisplayColumns(this.structure));
    }

    getTableDyTemplate(): void {
        this.tableDyService.getTableDyTemplate().toPromise()
            .then(pdfTemplates => this.pdfTemplates = pdfTemplates)
    }

    getDisplayColumns(columns) {
        for(let i = 0; i < columns.length; i++){
            this.displayedColumns.push(columns[i].name)
        }
    }

    getTableDyActions(): void {
        this.tableDyService.getTableDyActions().toPromise()
            .then(actions => this.actions = actions)
    }

    selectAll(checked) {
        this.checkbox = checked;
        if(checked){
            this.selected = this.Users
        } else{
            this.selected = []
        }
    }

    selectedToPdf(element: Element) {
        const ElementSelect = this.selected.indexOf(element);
        ElementSelect != -1 ?
            this.selected.splice(ElementSelect , 1):
            this.selected.push(element);
    }

    log(){
        console.log(this.Users);
        console.log(this.selected);
        console.log('_______________________________________');
    }

    ngOnInit() {
        this.getTableDy();
        this.getTableDyTemplate();
        this.getTableDyActions();
    }

    openDialog(element: Element): void {
        let dialogRef = this.dialog.open(TableDyModalDialog, {
            width: '600px',
            data: element
        });
        dialogRef.afterClosed().subscribe(result => {
            console.log(result);
        });
    }

    PrintPdf() : void{
        PdfToPrintTestComponent.getSelectedPdf(this.pdfTemplates[0]);
        PdfToPrintTestComponent.getUsersPdf(this.selected);
        this.router.navigateByUrl('/pdf-to-print')
    }

    AfterViewInit(data) {
        data.paginator = this.paginator;
        data.sort = this.sort;
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