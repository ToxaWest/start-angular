import { Injectable } from '@angular/core';
import {Element, ElementTemplate, ElementActions, UpdateElement, ElementResult} from './table-dy';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TableDyService {

    private tableDyUrl = 'http://217.12.219.175:3080/init';

    constructor(
        private http: HttpClient) { }

    getTableDy(): Observable<Element[]> {
        return this.http.get<Element[]>(this.tableDyUrl)
            .pipe(
                tap(tableDy => tableDy),
                catchError(this.handleError('getTableDy', []))
            );
    }

    getTableDyTemplate(): Observable<ElementTemplate[]> {
        return this.http.get<ElementTemplate[]>(this.tableDyUrl + '/docs')
            .pipe(
                tap(TableDyTemplate => TableDyTemplate),
                catchError(this.handleError('getTableDyTemplate', []))
            );
    }

    getTableDyActions(): Observable<ElementActions[]> {
        return this.http.get<ElementActions[]>(this.tableDyUrl + '/actions')
            .pipe(
                tap(TableDyActions => TableDyActions),
                catchError(this.handleError('getTableDyActions', []))
            );
    }

    updateTableDy(users: UpdateElement): Observable<any[]> {
        return this.http.put(this.tableDyUrl + '/claims_registry', users , httpOptions)
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



