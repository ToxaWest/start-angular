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

  todayDate: any;
  private static users: any;
  private static _selectedTemplate: any;
  _selectedTemplate:any;
  users:any;
  data = [];
  template: TemplatesInterface[];

  constructor(private pdfTemplateService: PdfTemplateService){}

  getTodayDate() {
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      this.todayDate = (dd < 10 ? '0' + dd : dd) + '.' + (mm < 10 ? '0' + mm : mm) + '.' + yyyy;
  }

  getTemplates(): void{
      this.pdfTemplateService.getTemplatesService()
          .then(templates => this.template = templates)
          .then(this._selectedTemplate = PdfToPrintTestComponent._selectedTemplate)
          .then(this.users = PdfToPrintTestComponent.users)
          .then(()=> this.makeTemplate(this.users))
  }

  makeTemplate (user) {
      const template = [];
      const newTemplate = this._selectedTemplate.data.replace(/&lt;/gm , '<' ).replace(/&gt;/gm , '>');
      const text_template =
          (typeof this._selectedTemplate === "undefined") ?
              _.template(this.template[0].data) :
              _.template(newTemplate);
      for (let i = 0; i < user.length; i++){
          user[i].todayDate = this.todayDate;
          const Templete = text_template(user[i]);
          template.push(
              Templete
          )
      }
      this.data = template;
  }

  ngOnInit() {
      this.getTemplates();
      this.getTodayDate();
  }

  static getUsersPdf(selected: any) {
    this.users = selected;
  }

  static editablePdf(selected: any) {
      this._selectedTemplate = selected
  }
}
