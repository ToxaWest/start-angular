import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { PdfTemplateService } from '../services/pdf-template.service';
import { TableDyService } from '../table-dy/table-dy.service';
import { TableStateOfClaimService} from '../table-state-of-claim/table-state-of-claim.service';
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
      console.log(templates.template);
    if (templates.template === 'claim_order_request') {
        this.pdfTemplateService.getTemplateStateOfClaim()
            .subscribe(data => this.selectedTemplate = data[0].template);
    } else if (templates.template === 'notification') {
        this.pdfTemplateService.getTemplateNotifications()
            .subscribe(data => this.selectedTemplate = data[0].template);
    }
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
