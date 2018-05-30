import { Injectable } from '@angular/core';
import {Element} from './table';
import {ELEMENT_DATA} from './mock-table';

@Injectable()
export class PdfToPrintTestService {
    static getUsersPdf(): Promise<Element[]> {
        return Promise.resolve(ELEMENT_DATA);
    }
}
