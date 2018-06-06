import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { PdfTemplateService } from '../services/pdf-template.service';
import { TemplatesInterface } from '../services/templates-interface';

@Component({
  selector: 'app-pdf-to-print-test',
  templateUrl: './pdf-to-print-test.component.html',
  providers: [PdfTemplateService],
})
export class PdfToPrintTestComponent implements OnInit {

  private static users: any;
  private static _selectedTemplate: any;
  _selectedTemplate: any;
  _users: any;
  todayDate: any;
  data = [];
  template: TemplatesInterface[];

  static getUsersPdf(selected: any) {
      this.users = selected;
  }

  static getSelectedPdf(selected: any) {
      this._selectedTemplate = selected;
  }

  constructor(private pdfTemplateService: PdfTemplateService) {}

  getTodayDate() {
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      this.todayDate = (dd < 10 ? '0' + dd : dd) + '.' + (mm < 10 ? '0' + mm : mm) + '.' + yyyy;
  }

  getTemplates(): void {
      this.pdfTemplateService.getTemplates()
          .then(templates => this.template = templates)
          .then(this._selectedTemplate = PdfToPrintTestComponent._selectedTemplate)
          .then(this._users = PdfToPrintTestComponent.users)
          .then(() => this.makeTemplate(this._selectedTemplate));
  }

  makeTemplate (useTemplate) {
      let newTemplate: any;
      if (typeof useTemplate === 'undefined') {
          newTemplate = this.template[0].template
              .replace(/&lt;/gm , '<' )
              .replace(/&gt;/gm , '>');
          this.cteateTemplate(this._users , newTemplate);
      } else if (useTemplate === 'notification') {
          this.pdfTemplateService.getTemplateNotifications()
              .subscribe(data => {
                  newTemplate = data[0].template
                        .replace(/&lt;/gm , '<' )
                        .replace(/&gt;/gm , '>');
                  this.cteateTemplate(this._users , newTemplate);
                  }
              );

      } else {
          newTemplate = this._selectedTemplate.data
              .replace(/&lt;/gm , '<' )
              .replace(/&gt;/gm , '>');
          this.cteateTemplate(this._users , newTemplate);
      }

  }

  cteateTemplate(user , newTemplate) {
      const template:any = [];
      const text_template = _.template(newTemplate);
      if (typeof user !== 'undefined') {
          for (let i = 0; i < user.length; i++) {
              user[i].todayDate = this.todayDate;
              const Templete = text_template(user[i]);
              template.push(
                  Templete
              );
          }
      }
      this.data = template.join('<div class="new-page"></div>');
  }

  ngOnInit() {
      this.getTemplates();
      this.getTodayDate();
  }

}
