import { Injectable } from '@angular/core';
import {Results} from './table-state-of-claim';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
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

  private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
          console.error(error);
          console.log(`${operation} failed: ${error.message}`);
          return of(result as T);
      };
  }

}
