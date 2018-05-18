import { Component, OnInit } from '@angular/core';
import { PdfTemplateService } from '../services/pdf-template.service';
import { TemplatesInterface } from '../services/templates-interface';
import {Router} from '@angular/router';
import {PdfToPrintTestComponent} from '../pdf-to-print-test/pdf-to-print-test.component';

@Component({
  selector: 'app-edit-pdf-template',
  templateUrl: './edit-pdf-template.component.html',
  styleUrls: ['./edit-pdf-template.component.css'],
  providers: [PdfTemplateService],
})
export class EditPdfTemplateComponent implements OnInit {

  template: TemplatesInterface[];
  selectedTemplate: any;
  selected:any;

  constructor(private pdfTemplateService: PdfTemplateService , private router: Router){}

  getTemplates(): void{
      this.pdfTemplateService.getTemplatesService()
          .then(templates => this.template = templates)
  }

  ngOnInit() {
      this.getTemplates();
  }

  selectPdf(templates : PdfTemplateService): void {
    this.selectedTemplate = templates;
  }

  savePdf (){
      PdfToPrintTestComponent.editablePdf(this.selectedTemplate);
      this.router.navigateByUrl('/')
  }

}
