import {Component} from '@angular/core';

@Component({
    selector: 'app-expand',
    templateUrl: './expand.component.html',
    styleUrls: ['./expand.component.css'],
})
export class ExpandComponent {

  steps = [
      { name: "О.И.", description: 'Общая информация', color: '#7db0a9' },
      { name: "Д.У.", description: 'Досудебное уведомление', color: '#477082' },
      { name: "И.З.", description: 'Исковое заявление', color: '#a2b476' },
      { name: "И.П.", description: 'Исполнительное производство', color: '#a2b476' },
      { name: "И.Р.", description: 'Итоги работы', color: '#768b6a' },
      { name: "edit", description: 'Этап "Общая информация"', color: '#d5b809' }
  ];

}