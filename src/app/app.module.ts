import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAppModule } from './ngmaterial.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { TableComponent, TableModalDialogComponent} from './table-basic-example/table-basic-example';
import { TabsComponent } from './tabs/tabs.component';
import { ExpandComponent } from './expand/expand.component';
import { TableDyComponent, TableDyModalDialog } from './table-dy/table-dy.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { HeroService} from './heroes/hero.service';
import { CreatePdfComponent} from './create-pdf/create-pdf.component';
import { PdfService } from './create-pdf/pdf.service';
import {TableBasicService} from './table-basic-example/table-basic.service';
import {PdfToPrintTestComponent} from './pdf-to-print-test/pdf-to-print-test.component';
import {PdfToPrintTestService} from './pdf-to-print-test/pdf-to-print-test.service';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    TableComponent,
    TabsComponent,
    TableModalDialogComponent,
    ExpandComponent,
    TableDyComponent,
    TableDyModalDialog,
    LoginComponent,
    CreatePdfComponent,
    PdfToPrintTestComponent,
],
  imports: [
    BrowserModule,
    FormsModule,
    TableComponent,
    MaterialAppModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
        {
            path: 'heroes',
            component: HeroesComponent
        },
        {
            path: '',
            component: TabsComponent
        },
        {
            path: 'login',
            component: LoginComponent
        },
        {
            path: 'create-pdf',
            component: CreatePdfComponent
        },
        {
            path: 'pdf-to-print',
            component: PdfToPrintTestComponent
        }
    ])
  ],
  providers: [HeroService , PdfService , TableBasicService, PdfToPrintTestService],
  entryComponents: [TableModalDialogComponent, TableDyModalDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }


