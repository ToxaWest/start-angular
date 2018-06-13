import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { PdfTemplateService } from '../_services';
import {Router} from '@angular/router';

@Component({
  selector: 'app-edit-pdf-template',
  templateUrl: './edit-pdf-template.component.html',
  providers: [PdfTemplateService],
})
export class EditPdfTemplateComponent implements OnInit {

  template = [];
  selectedTemplate: any;
  selected: any;
  selectedTemplateData: any;

  constructor(
      private pdfTemplateService: PdfTemplateService ,
      private router: Router
  ) {}

  getTemplates(): void {
      this.pdfTemplateService.getTemplateKeys()
          .subscribe(data => this.template = data);
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
