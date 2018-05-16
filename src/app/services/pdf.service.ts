import { Injectable } from '@angular/core';
import { Element } from '../table-general-info/template-interface';
import { ELEMENT_DATA } from '../table-general-info/template-data';

@Injectable()
export class PdfService {

    getPdf(): Promise<Element[]> {
        return Promise.resolve(ELEMENT_DATA);
    }

}
