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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(filterValue: string) {
      filterValue = filterValue.trim();
      filterValue = filterValue.toLowerCase();
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
