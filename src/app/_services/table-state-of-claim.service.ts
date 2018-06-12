import { Injectable } from '@angular/core';
import {TableResult, ElementActions, TemplatesInterface, UpdateElement} from '../_models';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable()
export class TableStateOfClaimService {

  private Url = 'http://217.12.219.175:3080/claims_registry';

  constructor(private http: HttpClient) { }

  getTableStateOfClaim(): Observable<TableResult[]> {
    return this.http.get<TableResult[]>(this.Url);
  }

  getStateOfClaimTemplate(): Observable<TemplatesInterface[]> {
    return this.http.get<TemplatesInterface[]>(this.Url + '/docs');
  }

 getTableStateOfClaimActions(): Observable<ElementActions[]> {
      return this.http.get<ElementActions[]>(this.Url + '/actions');
  }

 updateTableStateOfClaim(users: UpdateElement): Observable<any> {
      return this.http.put(this.Url + '/claims_registry', users , httpOptions);
  }

}
