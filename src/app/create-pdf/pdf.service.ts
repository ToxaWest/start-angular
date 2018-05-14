import { Injectable } from '@angular/core';
import { Element } from '../table-basic-example/template-interface';
import { ELEMENT_DATA } from '../table-basic-example/template-data';

@Injectable()
export class PdfService {

    getPdf(): Promise<Element[]> {
        return Promise.resolve(ELEMENT_DATA);
    }

}
