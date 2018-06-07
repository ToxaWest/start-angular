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
  filteredData = {
      dname:[],
      bname:[],
      stname:[],
      sname:[],
      hpart:[],
      hname:[]
  };

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(column: string, filterValue: string) {
      console.log(filterValue);
      if (column === 'dname') {
          this.filteredData.dname = filterValue.trim().toLowerCase();
      }
      if (column === 'bname') {
          this.filteredData.bname = filterValue.trim().toLowerCase();
      }
      if (column === 'stname') {
          this.filteredData.stname = filterValue.trim().toLowerCase();
      }
      if (column === 'sname') {
          this.filteredData.sname = filterValue.trim().toLowerCase();
      }
      if (column === 'hpart') {
          this.filteredData.hpart = filterValue.trim().toLowerCase();
      }
      if (column === 'hname') {
          this.filteredData.hname = filterValue.trim().toLowerCase();
      }
     console.log(this.filteredData);
      this.dataSource.filterPredicate = function (data: ElementResult) {
          const compRes =
              data.bname.trim().toLowerCase().indexOf(this.filteredData.bname) !== -1 &&
              data.dname.trim().toLowerCase().indexOf(this.filteredData.dname) !== -1 &&
              data.stname.trim().toLowerCase().indexOf(this.filteredData.stname) !== -1 &&
              data.sname.trim().toLowerCase().indexOf(this.filteredData.sname) !== -1 &&
              data.hpart.trim().toLowerCase().indexOf(this.filteredData.hpart) !== -1 &&
              data.hname.trim().toLowerCase().indexOf(this.filteredData.hname) !== -1;
          return compRes;
      };
      this.dataSource.filter = '';
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
            this.Users = this.dataSource.data;
            this.getDisplayColumns(this.structure);
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

  getDisplayColumns(columns) {
        for (let i = 0; i < columns.length; i++) {
          if (columns[i].visible) {
            this.displayedColumns.push(columns[i].name);
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
