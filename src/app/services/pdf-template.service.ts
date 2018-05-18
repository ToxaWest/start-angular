import { Injectable } from '@angular/core';
import { TemplatesInterface } from './templates-interface';
import { TEMPLATES } from './pdf-templates';

@Injectable()
export class PdfTemplateService {

  getTemplates(): Promise<TemplatesInterface[]>{
    return Promise.resolve(TEMPLATES);
  }

  getTemplatesService(): Promise<TemplatesInterface[]>{
      return new Promise(resolve => {
          setTimeout(() => resolve(this.getTemplates()), 1000);
      });
  }

}
