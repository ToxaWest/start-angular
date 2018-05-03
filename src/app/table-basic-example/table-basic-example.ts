import { Component, NgModule, AfterViewInit, ViewChild, Inject } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog,  MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';
import { ELEMENT_DATA } from '../mock-table';
import { Element } from '../table';
import * as pdfMake from '../../../node_modules/pdfmake/build/pdfmake';
import * as pdfFonts from '../../../node_modules/pdfmake/build/vfs_fonts.js';

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

    openDialog(element: Element): void {
        const dialogRef = this.dialog.open(TableModalDialog, {
            width: '600px',
            data: element
        });
        dialogRef.afterClosed().subscribe(result => {
            this.selectedUser = result;
        });
    }

    selected = [];
    PrintPdf() {
        let selectedPrecontent = [];
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        for (let i = 0; i < this.selected.length; i++) {
            selectedPrecontent.push(
                { text: this.selected[i].name + ' ' + this.selected[i].number , style: 'header' , fontSize: 22 , bold: true }
            );
            selectedPrecontent.push(
                { text: 'Адрес: ' + this.selected[i].address , fontSize: 16}
            );
            selectedPrecontent.push(
                { text: 'Долг: ' + this.selected[i].debt , fontSize: 16}
            );
            selectedPrecontent.push(
                { text: 'Дата: ' + this.selected[i].date , fontSize: 16 }
            );
        }
        let docDefinition = {
            info: {
                title: Date(),
                author: 'john doe',
                subject: 'subject of document',
                keywords: 'keywords for document',
            },
            content: selectedPrecontent,
        };
         pdfMake.createPdf(docDefinition).download();
    }

    selectedToPdf(element: Element) {
        console.log(element.number);
        const ElementSelect = this.selected.indexOf(element);
        ElementSelect !== -1 ?
            this.selected.slice(ElementSelect , 1) :
            this.selected.push(element)
        ;
        console.log(this.selected);
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
export class TableModalDialog {

    constructor(
        public dialogRef: MatDialogRef<TableModalDialog>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    // onNoClick(): void {
    //     this.dialogRef.close();
    // }
}
