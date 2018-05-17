import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pdf-to-print-test',
  templateUrl: './pdf-to-print-test.component.html',
  styleUrls: ['./pdf-to-print-test.component.css'],
})
export class PdfToPrintTestComponent implements OnInit {

  todayDate: any;
  private static users: any;
  users:any;
  data = [];


  getTodayDate() {
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1;
      const yyyy = today.getFullYear();
      this.todayDate = (dd < 10 ? '0' + dd : dd) + '.' + (mm < 10 ? '0' + mm : mm) + '.' + yyyy;
  }

  makeTemplate (user) : void {
      const template = [];
      for (let i = 0; i < user.length; i++){
          let name = user[i].name;
          let address = user[i].address;
          let number = user[i].number;
          let debt = user[i].debt;
          let todayDate = this.todayDate;
          const Templete:any = `<div style="display: flex; align-items: center; justify-content: space-between">
                <img src="/assets/logo.jpg" style="width: 50px"/>
                <h3 style="text-align: center" >К О М У Н А Л Ь Н Е П І Д П Р И Є М С Т В О<br>„Ж И Л К О М С Е Р В І С”</h3>
                <div style="width: 50px"></div>
                </div><hr>
                <div style="text-align: right">${name}</div>
                <div style="text-align: right">${address}</div>
                <h3 style="text-align: center" >ВЫМОГА</h3>
                <p>Доводимо до Вашого відома, що по Вашому особовому рахунку №${number} станом на ${todayDate}року 
                виникла заборгованість перед КП «Жилкомсервіс» в сумі ${debt}грн. У зв\'язку з наявністю у Вас
                 невиконаних зобов\'язань щодо оплати послуг з утримання будинків і споруд та прибудинкових територій, з 
                 метою попередження звернення КП «Жилкомсервіс» до суду з заявою/позовом про стягнення з Вас заборгованості 
                 за послуги з утримання будинків і споруд та прибудинкових територій з урахуванням індексу інфляції та трьох 
                 відсотків річних, а також відшкодування судового збору, розмір якого з 01.01.2018 становить 176,20/1762,00 грн. 
                 відповідно, з подальшим зверненням до органів державної виконавчої служби з відповідною заявою та поданням
                  в межах виконавчого провадження клопотання про звернення стягнення на Ваше майно і тимчасове обмеження Вас у 
                  праві виїзду за межі України відповідно до статті 6 Закону України «Про порядок виїзду з України і в\'їзду в 
                  Україну громадян України», пропонуємо Вам врегулювати зазначене питання в досудовому порядку, та оплатити 
                  заборгованість перед КП «Жилкомсервіс» протягом 7 днів з моменту отримання даного повідомлення та надати копії 
                  платіжних документів до бухгалтерії дільниці № 41 КП «Жилкомсервіс». 
                  </p>`;
          template.push(
              Templete
          )
      }
      this.data = template;
  }

  ngOnInit() {
      this.getTodayDate();
      this.users = PdfToPrintTestComponent.users;
      this.makeTemplate(this.users);
  }

  static getUsersPdf(selected: any) {
    this.users = selected;
  }
}
