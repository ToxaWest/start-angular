import { Component, OnInit } from '@angular/core';
import * as _ from 'underscore';
import { PdfTemplateService } from '../_services';
import { TemplatesInterface } from '../_models';
import {HomeComponent} from '../home';

@Component({
  selector: 'app-pdf-to-print-test',
  templateUrl: './pdf-to-print-test.component.html',
  providers: [PdfTemplateService, HomeComponent],
})
export class PdfToPrintTestComponent implements OnInit {

  private static users: any;
  private static _selectedTemplate: any;
  _selectedTemplate: any;
  _users: any;
  _userData: any;
  todayDate: any;
  data = [];
  template: TemplatesInterface[];
    private withUserInfo: any;

  static getUsersPdf(selected: any) {
      this.users = selected;
  }

  static getSelectedPdf(selected: any) {
      this._selectedTemplate = selected;
  }

  constructor(
      private pdfTemplateService: PdfTemplateService,
      private homeComponent: HomeComponent
  ) {}

  getTodayDate() {
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      this.todayDate = (dd < 10 ? '0' + dd : dd) + '.' + (mm < 10 ? '0' + mm : mm) + '.' + yyyy;
  }

  makeTemplate (useTemplate) {
      console.log(useTemplate);
      let newTemplate: any;
      this.pdfTemplateService.getTemplateAll(useTemplate)
          .subscribe(data => {
              console.log(data);
                  newTemplate = data.template
                      .replace(/&lt;/gm , '<' )
                      .replace(/&gt;/gm , '>');
                  this.createTemplate(this._users , newTemplate);
              }
          );
  }

  createTemplate(user , newTemplate) {
      const template: any = [];
      const text_template = _.template(newTemplate);
      if (typeof user !== 'undefined') {
          for (let i = 0; i < user.length; i++) {
              user[i].todayDate = this.todayDate;
              if (this._userData) {
                  this.withUserInfo = Object.assign(this._userData, user[i]);
              } else {
                  this.withUserInfo = user[i];
              }
              const Template = text_template(this.withUserInfo);
              template.push(
                  Template
              );
          }
      }
      this.data = template.join('<div class="new-page"></div>');
  }

  ngOnInit() {
     if (this.homeComponent.userData) {
            this._userData = this.homeComponent.userData;
        }
      this._selectedTemplate = PdfToPrintTestComponent._selectedTemplate;
      this._users = PdfToPrintTestComponent.users;
      this.makeTemplate(this._selectedTemplate);
      this.getTodayDate();
  }

}
