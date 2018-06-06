import { Injectable } from '@angular/core';
import { TemplatesInterface } from './templates-interface';
import { TEMPLATES } from './pdf-templates';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PdfTemplateService {

  getTemplates(): Promise<TemplatesInterface[]> {
    return Promise.resolve(TEMPLATES);
  }

    constructor(
        private http: HttpClient) { }

  getTemplateNotifications(): Observable<TemplatesInterface[]> {
      return this.http.get<TemplatesInterface[]>('http://217.12.219.175:3080/init/template/claim_order_request')
          .pipe(
              tap(TemplateNotifications => TemplateNotifications),
              catchError(this.handleError('getTableDy', []))
          );
  }

  private handleError<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            console.error(error);
            console.log(`${operation} failed: ${error.message}`);
            return of(result as T);
        };
}
}
