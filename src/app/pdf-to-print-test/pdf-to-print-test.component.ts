import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-to-print-test',
  templateUrl: './pdf-to-print-test.component.html',
  styleUrls: ['./pdf-to-print-test.component.css'],
})
export class PdfToPrintTestComponent implements OnInit {

  todayDate: any;
  private static users: any;
  users:any;

  getTodayDate() {
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      this.todayDate = (dd < 10 ? '0' + dd : dd) + '.' + (mm < 10 ? '0' + mm : mm) + '.' + yyyy;
  }

  ngOnInit() {
      this.getTodayDate();
      this.users = PdfToPrintTestComponent.users;
  }

  static getUsersPdf(selected: any) {
    this.users = selected;
  }
}
