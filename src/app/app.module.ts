import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAppModule } from './ngmaterial.module';
import { ExpandComponent } from './expand/expand.component';
import { RouterModule } from '@angular/router';
import { NgxEditorModule } from 'ngx-editor';
// Components //
import { AppComponent } from './app.component';
import { TabsComponent } from './tabs/tabs.component';
import { TableComponent, TableModalDialogComponent} from './table-general-info/table-general-info';
import { TableDyComponent, TableDyModalDialog } from './table-dy/table-dy.component';
import { LoginComponent } from './login/login.component';
import { CreatePdfComponent} from './create-pdf/create-pdf.component';
import {EditPdfTemplateComponent, SafeHtmlPipe} from './edit-pdf-template/edit-pdf-template.component';
import {PdfToPrintTestComponent} from './pdf-to-print-test/pdf-to-print-test.component';
import {TableStateOfClaimComponent} from  './table-state-of-claim/table-state-of-claim.component'
// Services //
import { PdfService } from './services/pdf.service';
import {TableBasicService} from './services/table-basic.service';
import {PdfToPrintTestService} from './services/pdf-to-print-test.service';
import {PdfTemplateService} from './services/pdf-template.service';
import {TableDyService} from './table-dy/table-dy.service';
import {TableStateOfClaimService} from './table-state-of-claim/table-state-of-claim.service';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TabsComponent,
    TableModalDialogComponent,
    ExpandComponent,
    TableDyComponent,
    TableDyModalDialog,
    LoginComponent,
    CreatePdfComponent,
    SafeHtmlPipe,
    PdfToPrintTestComponent,
    EditPdfTemplateComponent,
      TableStateOfClaimComponent,
],
  imports: [
    BrowserModule,
    FormsModule,
    TableComponent,
    MaterialAppModule,
    HttpClientModule,
    NgxEditorModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
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
        },
        {
            path: 'edit-template',
            component: EditPdfTemplateComponent
        }
    ])
  ],
  providers: [
      PdfService ,
      TableBasicService,
      PdfToPrintTestService ,
      PdfTemplateService,
      TableStateOfClaimService,
      TableDyService
  ],
  entryComponents: [TableModalDialogComponent, TableDyModalDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }


