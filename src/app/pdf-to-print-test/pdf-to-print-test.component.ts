import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { PdfTemplateService } from '../services/pdf-template.service';
import { TemplatesInterface } from '../services/templates-interface';

@Component({
  selector: 'app-pdf-to-print-test',
  templateUrl: './pdf-to-print-test.component.html',
  styleUrls: ['./pdf-to-print-test.component.css'],
  providers: [PdfTemplateService],
})
export class PdfToPrintTestComponent implements OnInit {

  todayDate: any;
  private static users: any;
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
          .then(this.users = PdfToPrintTestComponent.users)
          .then(()=> this.makeTemplate(this.users))
  }

  makeTemplate (user) {
      console.log(this.template);
      const template = [];
      const text_template = _.template(this.template[0].data);
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
}
