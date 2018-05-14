import { Injectable } from '@angular/core';
import {Element} from '../table';
import {ELEMENT_DATA} from '../mock-table';

@Injectable()
export class PdfToPrintTestService {
    getUsersPdf(): Promise<Element[]> {
        return Promise.resolve(ELEMENT_DATA);
    }
    getUsersPdfSlowly(): Promise<Element[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.getUsersPdf()), 1000);
        });
    }
}
