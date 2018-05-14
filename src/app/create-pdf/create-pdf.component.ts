import {Component, OnInit} from '@angular/core';
import { Element } from '../table-basic-example/template-interface';
import {PdfService} from './pdf.service';
import * as _ from 'underscore';

@Component({
  selector: 'app-create-pdf',
  templateUrl: './create-pdf.component.html',
  styleUrls: ['./create-pdf.component.css'],
  providers: [PdfService]
})

export class CreatePdfComponent implements OnInit {

    pdf: Element[];

    constructor(private pdfService: PdfService) {}

    getTemplate(): void {
        this.pdfService.getPdf().then(pdf => this.pdf = pdf);
    }

    ngOnInit() {
        this.getTemplate();
    }

}

