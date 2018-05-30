import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { PdfTemplateService } from '../services/pdf-template.service';
import { TemplatesInterface } from '../services/templates-interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-pdf-template',
  templateUrl: './edit-pdf-template.component.html',
  providers: [PdfTemplateService],
})
export class EditPdfTemplateComponent implements OnInit {

  template: TemplatesInterface[];
  selectedTemplate: any;
  selected: any;

  constructor(private pdfTemplateService: PdfTemplateService , private router: Router) {}

  getTemplates(): void {
      this.pdfTemplateService.getTemplatesService()
          .then(templates => this.template = templates);
  }

  ngOnInit() {
      this.getTemplates();
  }

  selectPdf(templates: PdfTemplateService): void {
    this.selectedTemplate = templates;
  }

  savePdf () {
      this.router.navigateByUrl('/');
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
