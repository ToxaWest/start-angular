import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import * as _ from 'underscore';
import { ELEMENT_DATA } from './template-data';

export class Template1 {
    static PrintPdf(selected) {
        const text_template = _.template(ELEMENT_DATA[0].Text);
        const text_template2 = _.template(ELEMENT_DATA[0].Text1);
        const selectedContent: object[] = [{}];
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        for (let i = 0; i < selected.length; i++) {
            const breakPage = i === selected.length - 1 ?  null : 'after';
            selected[i].currentDate = ELEMENT_DATA[0].todayDate;
            const Text = text_template(selected[i]);
            const Text1 = text_template2(selected[i]);
            selectedContent.push(
                {columns: [
                        {image: ELEMENT_DATA[0].imgUrl, width: 40},
                        {text: 'К О М У Н А Л Ь Н Е   П І Д П Р И Є М С Т В О \n ' +
                            '„Ж И Л К О М С Е Р В І С”', alignment: 'center' , width: '*' , fontSize: 17, bold: true},
                        {text: '', width: 40}
                    ]},
                {canvas: [{ type: 'line', x1: 60, y1: 5, x2: 702, y2: 5, lineWidth: 3 }]},
                {text: Text, style: 'para'},
                {text: '\nВЫМОГА' , fontSize: 18, alignment: 'center'},
                {text: Text1 , fontSize: 16 , alignment: 'justify'},
                {text: '\nКП «Жилкомсервіс»' , pageBreak: breakPage, style: 'para'}
            );
        }
        const docDefinition: any = {
            pageOrientation: 'landscape',
            pageMargins: [ 35, 40, 35, 40 ],
            info: {
                title: Date(),
                author: 'john doe',
                subject: 'subject of document',
                keywords: 'keywords for document',
            },
            content : selectedContent,
            styles: {
                para: {
                    margin: [0, 4, 0, 4] ,
                    fontSize: 18 ,
                    alignment: 'right'
                }
            }
        };
        pdfMake.createPdf(docDefinition).download();
    }
}
