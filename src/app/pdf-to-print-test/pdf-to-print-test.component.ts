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
  _selectedTemplate:any;
  _users:any;
  todayDate: any;
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
          .then(this._users = PdfToPrintTestComponent.users)
          .then(()=> this.makeTemplate(this._users))
  }

  makeTemplate (user) {
      const template = [];
      let newTemplate:any;
      if(typeof this._selectedTemplate === "undefined"){
          newTemplate = this.template[0].data.replace(/&lt;/gm , '<' ).replace(/&gt;/gm , '>');
      } else if(this._selectedTemplate.template === "notification") {
          newTemplate = this.template[2].data.replace(/&lt;/gm , '<' ).replace(/&gt;/gm , '>');
      }
      else {
          newTemplate = this._selectedTemplate.data.replace(/&lt;/gm , '<' ).replace(/&gt;/gm , '>');
      }
      let text_template = _.template(newTemplate);
      if(typeof user !== "undefined") {
          for (let i = 0; i < user.length; i++) {
              user[i].todayDate = this.todayDate;
              const Templete = text_template(user[i]);
              template.push(
                  Templete
              )
          }
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

  static getSelectedPdf(selected:any){
      this._selectedTemplate = selected
  }
}
