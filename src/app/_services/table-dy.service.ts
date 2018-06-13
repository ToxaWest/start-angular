import { Injectable } from '@angular/core';
import { TemplatesInterface, ElementActions, UpdateElement} from '../_models/';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TableDyService {

    private tableDyUrl = 'http://217.12.219.175:3080/grid/init';

    constructor(private http: HttpClient) { }

    getTableDy(): Observable<Element[]> {
        return this.http.get<Element[]>(this.tableDyUrl);
    }

    getTableDyTemplate(): Observable<TemplatesInterface[]> {
        return this.http.get<TemplatesInterface[]>(this.tableDyUrl + '/docs');
    }

    getTableDyActions(): Observable<ElementActions[]> {
        return this.http.get<ElementActions[]>(this.tableDyUrl + '/actions');
    }

    updateTableDy(users: UpdateElement): Observable<any> {
        return this.http.put(this.tableDyUrl + '/claims_registry', users , httpOptions);
    }

}



