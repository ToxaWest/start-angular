import { Injectable } from '@angular/core';
import { TemplatesInterface } from '../_models';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpHeaders} from '@angular/common/http';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PdfTemplateService {

  constructor(
      private http: HttpClient) { }

  getTemplateNotifications(): Observable<TemplatesInterface[]> {
      return this.http.get<TemplatesInterface[]>('http://217.12.219.175:3080/init/template/notification');
  }

  updateTemplateNotifications(template: TemplatesInterface): Observable<any> {
      return this.http.put('http://217.12.219.175:3080/init/template/notification', template , httpOptions);
  }

  getTemplateStateOfClaim(): Observable<TemplatesInterface[]> {
      return this.http.get<TemplatesInterface[]>('http://217.12.219.175:3080/init/template/claim_order_request');
  }

  updateTemplateStateOfClaim(template: TemplatesInterface): Observable<any> {
      return this.http.put('http://217.12.219.175:3080/init/template/claim_order_request', template , httpOptions);
  }
}
