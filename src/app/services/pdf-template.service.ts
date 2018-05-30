import { Injectable } from '@angular/core';
import { TemplatesInterface } from './templates-interface';
import { TEMPLATES } from './pdf-templates';

@Injectable()
export class PdfTemplateService {

  static getTemplates(): Promise<TemplatesInterface[]> {
    return Promise.resolve(TEMPLATES);
  }

  getTemplatesService(): Promise<TemplatesInterface[]> {
      return new Promise(resolve => {
          setTimeout(() => resolve(PdfTemplateService.getTemplates()), 1000);
      });
  }

}
