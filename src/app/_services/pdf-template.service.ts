import { Injectable } from '@angular/core';
import { TemplatesInterface } from '../_models';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {HttpClient, HttpHeaders} from '@angular/common/http';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PdfTemplateService {

  constructor(
      private http: HttpClient) { }

  getTemplateNotifications(): Observable<TemplatesInterface[]> {
      return this.http.get<TemplatesInterface[]>('http://217.12.219.175:3080/init/template/notification')
          .pipe(
              tap(TemplateNotifications => TemplateNotifications),
              catchError(this.handleError('getTableDy', []))
          );
  }

  updateTemplateNotifications(template: TemplatesInterface): Observable<any[]> {
      return this.http.put('http://217.12.219.175:3080/init/template/notification', template , httpOptions)
          .pipe(
              tap(updateTemplateNotifications => updateTemplateNotifications),
              catchError(this.handleError<any>('updateTemplateNotifications'))
          );
  }

  getTemplateStateOfClaim(): Observable<TemplatesInterface[]> {
      return this.http.get<TemplatesInterface[]>('http://217.12.219.175:3080/init/template/claim_order_request')
          .pipe(
              tap(TemplateStateOfClaim => TemplateStateOfClaim),
              catchError(this.handleError('getTemplateStateOfClaim', []))
          );
  }

  updateTemplateStateOfClaim(template: TemplatesInterface): Observable<any[]> {
      return this.http.put('http://217.12.219.175:3080/init/template/claim_order_request', template , httpOptions)
          .pipe(
              tap(updateTemplateStateOfClaim => updateTemplateStateOfClaim),
              catchError(this.handleError<any>('updateTemplateStateOfClaim'))
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
