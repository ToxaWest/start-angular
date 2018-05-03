import { Component } from '@angular/core';
import * as pdfMake from '../../../node_modules/pdfmake/build/pdfmake';
import * as pdfFonts from '../../../node_modules/pdfmake/build/vfs_fonts.js';

@Component({
  selector: 'app-pdf-generate',
  templateUrl: './pdf-generate.component.html',
  styleUrls: ['./pdf-generate.component.css']
})
export class PdfGenerateComponent {
  constructor() {
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      var dd = { content: 'This is an sample PDF printed with pdfMake' };
      pdfMake.createPdf(dd).download();
  }

}
