import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { PdfTemplateService, TableDyService, TableStateOfClaimService } from '../_services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-pdf-template',
  templateUrl: './edit-pdf-template.component.html',
  providers: [PdfTemplateService , TableDyService, TableStateOfClaimService],
})
export class EditPdfTemplateComponent implements OnInit {

  template = [];
  selectedTemplate: any;
  selected: any;
  selectedTemplateData: any;

  constructor(
      private pdfTemplateService: PdfTemplateService ,
      private tableDyService: TableDyService,
      private tableStateOfClaimService: TableStateOfClaimService,
      private router: Router
  ) {}

  getTemplates(): void {
       this.tableDyService.getTableDyTemplate()
          .subscribe(pdfTemplates => this.addTemplates(pdfTemplates));
       this.tableStateOfClaimService.getStateOfClaimTemplate()
          .subscribe(pdfTemplates => this.addTemplates(pdfTemplates));
  }

  addTemplates(template): void {
      for (let i = 0 ; i < template.length; i++) {
          this.template.push(template[i]);
      }
  }

  ngOnInit() {
      this.getTemplates();
  }

  selectPdf(templates): void {
    this.pdfTemplateService.getTemplateAll(templates.name)
        .subscribe(data => {
            this.selectedTemplateData = data;
            this.selectedTemplate = this.selectedTemplateData.template;
        });
  }

  savePdf() {
      this.selectedTemplateData.template = this.selectedTemplate;
        this.pdfTemplateService.updateTemplateAll(this.selectedTemplateData)
            .subscribe(() => this.router.navigateByUrl('/' + this.selectedTemplateData.name));
  }

}

import { DomSanitizer } from '@angular/platform-browser';

@Pipe({name: 'safeHtml'})
export class SafeHtmlPipe implements PipeTransform {

    constructor(private sanitizer: DomSanitizer) {}

    transform(html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

}
