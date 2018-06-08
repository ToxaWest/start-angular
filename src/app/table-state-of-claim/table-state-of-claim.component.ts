import {Component, OnInit, ViewChild} from '@angular/core';
import {TableStateOfClaimService} from './table-state-of-claim.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {SelectionModel} from '@angular/cdk/collections';
import {ElementResult} from '../table-dy/table-dy';

@Component({
  selector: 'app-table-state-of-claim',
  templateUrl: './table-state-of-claim.component.html',
  styleUrls: ['./table-state-of-claim.component.css'],
  providers: [TableStateOfClaimService]
})
export class TableStateOfClaimComponent implements OnInit {

  data: any;
  displayedColumns = ['select'];
  dataSource;
  selection;
  structure;
  Users;
  filteredData: {[k: string]: any} = {};

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(column: string, filterValue: string) {
      const _this = this;
      this.dataSource.filterPredicate = function (data: ElementResult) {
          if (_this.filteredData.hasOwnProperty(column)) {
              _this.filteredData[column] = filterValue.trim().toLowerCase();
          }
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
      this.dataSource.filter = filterValue;
  }

  constructor(
      public dialog: MatDialog,
      private tableStateOfClaimService: TableStateOfClaimService,
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
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  getDisplayColumns(columns): void {
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].visible) {
            this.displayedColumns.push(columns[i].name);
            this.filteredData[columns[i].name] = '';
          }
        }
  }

  ngOnInit() {
    this.getTableStateOfClaim();
    this.selection = new SelectionModel<ElementResult>(true, []);
  }

  AfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

}
