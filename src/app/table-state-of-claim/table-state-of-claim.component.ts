import {Component, OnInit, ViewChild} from '@angular/core';
import {TableStateOfClaimService} from '../_services';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {ElementResult} from '../_models';
import {Router} from '@angular/router';
import {PdfToPrintTestComponent} from '../pdf-to-print-test/pdf-to-print-test.component';

@Component({
  selector: 'app-table-state-of-claim',
  templateUrl: './table-state-of-claim.component.html',
  styleUrls: ['../table-dy/table-dy.component.css'],
  providers: [TableStateOfClaimService]
})
export class TableStateOfClaimComponent implements OnInit {

    displayedColumns = ['select'];
    dataSource;
    Users: any;
    data: any;
    structure: any;
    selectedAction: any;
    pdfTemplates;
    actions;
    selection;
    filteredData: {[k: string]: any} = {};

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
      this.dataSource.filterPredicate = function (data: ElementResult) {
          const boolean =
              data.bname.trim().toLowerCase().indexOf(_this.filteredData.bname) !== -1 &&
              data.dname.trim().toLowerCase().indexOf(_this.filteredData.dname) !== -1 &&
              data.fnum.trim().toLowerCase().indexOf(_this.filteredData.fnum) !== -1 &&
              data.hname.trim().toLowerCase().indexOf(_this.filteredData.hname) !== -1 &&
              data.hpart.trim().toLowerCase().indexOf(_this.filteredData.hpart) !== -1 &&
              data.op_date.trim().toLowerCase().indexOf(_this.filteredData.op_date) !== -1 &&
              data.saldo.toString().trim().toLowerCase().indexOf(_this.filteredData.saldo) !== -1 &&
              data.stname.trim().toLowerCase().indexOf(_this.filteredData.stname) !== -1 &&
              data.sname.trim().toLowerCase().indexOf(_this.filteredData.sname) !== -1 ;
          return boolean;
      };
      this.dataSource.filter = 'remove default filter';
  }

  constructor(
      public dialog: MatDialog,
      private tableStateOfClaimService: TableStateOfClaimService,
      private router: Router
  ) { }

  getTableStateOfClaim(): void {
    this.tableStateOfClaimService.getTableStateOfClaim()
        .subscribe((data) => {
            this.data = data;
            this.dataSource = new MatTableDataSource(this.data.results);
            this.AfterViewInit();
            this.structure = this.data.structure;
            this.getDisplayColumns(this.structure);
            this.Users = this.dataSource.data;
        });
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

  getTableStateOfClaimTemplate(): void {
      this.tableStateOfClaimService.getStateOfClaimTemplate()
          .subscribe(pdfTemplates => this.pdfTemplates = pdfTemplates);
  }

  UserAction(): void {
      // const putUsers = {'did': []};
      // for (let i = 0; i < this.selection.selected.length; i++) {
      //     putUsers.did.push(this.selection.selected[i].did);
      // }
      // this.tableStateOfClaimService.updateTableStateOfClaim(putUsers)
      //     .subscribe(() => this.router.navigateByUrl('/state-of-claim'));
  }

  PrintPdf(template): void {
      PdfToPrintTestComponent.getSelectedPdf(template);
      PdfToPrintTestComponent.getUsersPdf(this.selection.selected);
      this.router.navigateByUrl('/pdf-to-print');
  }

  getTableStateOfClaimActions(): void {
      this.tableStateOfClaimService.getTableStateOfClaimActions()
          .subscribe(actions => this.actions = actions);
  }

  getDisplayColumns(columns): void {
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].visible) {
          this.displayedColumns.push(columns[i].name);
          this.filteredData[columns[i].name] = ``;
        }
      }
  }

  ngOnInit() {
    this.getTableStateOfClaim();
    this.getTableStateOfClaimTemplate();
    this.getTableStateOfClaimActions();
    this.selection = new SelectionModel<ElementResult>(true, []);
  }

  AfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

}
