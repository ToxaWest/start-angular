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

    getTemplateAll(templateKey: string): Observable<any> {
      const template = {name: templateKey};
      return this.http.post('http://217.12.219.175:3080/template' , template , httpOptions);
    }

    updateTemplateAll(template: TemplatesInterface): Observable<any> {
        return this.http.put('http://217.12.219.175:3080/template', template , httpOptions);
    }
}
