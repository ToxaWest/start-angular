import {Component, OnInit, ViewChild} from '@angular/core';
import {TableStateOfClaimService} from './table-state-of-claim.service';
import {MatDialog, MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

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
  selected = [];
  checkbox: boolean;
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
    this.tableStateOfClaimService.getTableStateOfClaim().toPromise()
        .then(data => this.data = data)
        .then(() => this.dataSource = new MatTableDataSource(this.data.results))
        .then(() => this.AfterViewInit())
        .then(() => this.structure = this.data.structure)
        .then(() => this.Users = this.dataSource.data )
        .then(() => this.getDisplayColumns(this.structure));
  }

  selectAll(checked) {
      this.checkbox = checked;
      if (checked) {
          this.selected = this.data.result;
      } else {
          this.selected = [];
      }
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
  }

  AfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  }

}
