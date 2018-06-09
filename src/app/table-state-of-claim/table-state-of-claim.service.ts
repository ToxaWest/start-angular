import { Injectable } from '@angular/core';
import {Results} from './table-state-of-claim';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import {ElementActions, ElementTemplate, UpdateElement} from '../table-dy/table-dy';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class TableStateOfClaimService {

  private Url = 'http://217.12.219.175:3080/claims_registry';

  constructor(private http: HttpClient) { }

  getTableStateOfClaim(): Observable<Results[]> {
    return this.http.get<Results[]>(this.Url)
        .pipe(
            tap(TableStateOfClaim => TableStateOfClaim),
            catchError(this.handleError('getTableStateOfClaim', []))
        );
  }

  getStateOfClaimTemplate(): Observable<ElementTemplate[]> {
    return this.http.get<ElementTemplate[]>(this.Url + '/docs')
        .pipe(
            tap(TableStateOfClaimTemplate => TableStateOfClaimTemplate),
            catchError(this.handleError('getTableStateOfClaimTemplate', []))
        );
  }
 getTableStateOfClaimActions(): Observable<ElementActions[]> {
      return this.http.get<ElementActions[]>(this.Url + '/actions')
          .pipe(
              tap(TableDyActions => TableDyActions),
              catchError(this.handleError('getTableDyActions', []))
          );
  }
 updateTableStateOfClaim(users: UpdateElement): Observable<any[]> {
      return this.http.put(this.Url + '/claims_registry', users , httpOptions)
          .pipe(
              tap(updateTableDy => updateTableDy),
              catchError(this.handleError<any>('updateTableDy'))
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
