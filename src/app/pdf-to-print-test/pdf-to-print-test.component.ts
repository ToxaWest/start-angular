import { Component, OnInit } from '@angular/core';
import {PdfToPrintTestService} from './pdf-to-print-test.service';
import { Element } from '../table';

@Component({
  selector: 'app-pdf-to-print-test',
  templateUrl: './pdf-to-print-test.component.html',
  styleUrls: ['./pdf-to-print-test.component.css'],
  providers: [PdfToPrintTestService],
})
export class PdfToPrintTestComponent implements OnInit {

  users: Element[];
  todayDate: any = [];

  constructor(private pdfToPrintTestService: PdfToPrintTestService) { }

  getUsersPdf() {
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    this.todayDate = (dd < 10 ? '0' + dd : dd) + '.' + (mm < 10 ? '0' + mm : mm) + '.' + yyyy;
    this.pdfToPrintTestService.getUsersPdfSlowly().then(users => this.users = users);
  }

  ngOnInit() {
    this.getUsersPdf();
  }

}
