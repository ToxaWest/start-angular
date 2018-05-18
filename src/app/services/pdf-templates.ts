import { TemplatesInterface } from './templates-interface';

export const TEMPLATES: TemplatesInterface[] = [
    {
        id: 1,
        type: 'Общая информация',
        data: "<div style=\"text-align: left;\"><img src=\"/assets/logo.jpg\" style=\"background-color: transparent;\"></div><div style=\"text-align: center;\"><span style=\"background-color: transparent;\"><b>К О М У Н А Л Ь Н Е П І Д П Р И Є М С Т В О</b></span></div><div style=\"text-align: center;\"><span style=\"background-color: transparent;\"><b>&nbsp;„Ж И Л К О М С Е Р В І С”&nbsp;</b></span></div><div><hr id=\"null\"><div style=\"text-align: right;\">&lt;%= name %&gt;&nbsp;</div><div style=\"text-align: right;\">&lt;%= address %&gt;&nbsp;</div><div><br></div><div style=\"text-align: center;\"><b>ВЫМОГА&nbsp;</b></div><div><br></div><div style=\"text-align: justify;\">&nbsp; &nbsp; &nbsp;Доводимо до Вашого відома, що по Вашому особовому рахунку №&lt;%= number %&gt;&nbsp;станом на &lt;%= todayDate %&gt;року\n" +
            "виникла заборгованість перед КП «Жилкомсервіс» в сумі &lt;%= debt %&gt;грн.&nbsp;</div><div style=\"text-align: justify;\">&nbsp; &nbsp; &nbsp;У зв'язку з наявністю у Вас\n" +
            "невиконаних зобов'язань щодо оплати послуг з утримання будинків і споруд та прибудинкових територій, з\n" +
            "метою попередження звернення КП «Жилкомсервіс» до суду з заявою/позовом про стягнення з Вас заборгованості\n" +
            "за послуги з утримання будинків і споруд та прибудинкових територій з урахуванням індексу інфляції та трьох \n" +
            "відсотків річних, а також відшкодування судового збору, розмір якого з 01.01.2018 становить 176,20/1762,00 грн.  \n" +
            "відповідно, з подальшим зверненням до органів державної виконавчої служби з відповідною заявою та поданням \n" +
            "в межах виконавчого провадження клопотання про звернення стягнення на Ваше майно і тимчасове обмеження Вас у \n" +
            "праві виїзду за межі України відповідно до статті 6 Закону України «Про порядок виїзду з України і в'їзду в   \n" +
            "Україну громадян України», пропонуємо Вам врегулювати зазначене питання в досудовому порядку, та оплатити    \n" +
            "заборгованість перед КП&nbsp;«Жилкомсервіс» протягом 7&nbsp;днів з моменту отримання даного повідомлення та надати копії     \n" +
            "платіжних документів до бухгалтерії дільниці №&nbsp;41 КП «Жилкомсервіс».</div></div>"
    },
    {
        id: 2,
        type: 'Исковые заявления',
        data: `<img src="/assets/logo.jpg"/>К О М У Н А Л Ь Н Е П І Д П Р И Є М С Т В О „Ж И Л К О М С Е Р В І С”
<%= name %>
<%= address %>
ВЫМОГА
Доводимо до Вашого відома, що по Вашому особовому рахунку №<%= number %> станом на <%= todayDate %>року
виникла заборгованість перед КП «Жилкомсервіс» в сумі <%= debt %>грн. У зв\'язку з наявністю у Вас
невиконаних зобов\'язань щодо оплати послуг з утримання будинків і споруд та прибудинкових територій, з
метою попередження звернення КП «Жилкомсервіс» до суду з заявою/позовом про стягнення з Вас заборгованості
за послуги з утримання будинків і споруд та прибудинкових територій з урахуванням індексу інфляції та трьох 
відсотків річних, а також відшкодування судового збору, розмір якого з 01.01.2018 становить 176,20/1762,00 грн.  
відповідно, з подальшим зверненням до органів державної виконавчої служби з відповідною заявою та поданням 
в межах виконавчого провадження клопотання про звернення стягнення на Ваше майно і тимчасове обмеження Вас у 
праві виїзду за межі України відповідно до статті 6 Закону України «Про порядок виїзду з України і в\'їзду в   
Україну громадян України», пропонуємо Вам врегулювати зазначене питання в досудовому порядку, та оплатити    
заборгованість перед КП «Жилкомсервіс» протягом 7 днів з моменту отримання даного повідомлення та надати копії     
платіжних документів до бухгалтерії дільниці № 41 КП «Жилкомсервіс».`
    }
];