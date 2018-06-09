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
import { TableComponent, TableModalDialogComponent} from './table-general-info/table-general-info';
import { TableDyComponent, TableDyModalDialogComponent } from './table-dy/table-dy.component';
import { LoginComponent } from './login/login.component';
import {EditPdfTemplateComponent, SafeHtmlPipe} from './edit-pdf-template/edit-pdf-template.component';
import {PdfToPrintTestComponent} from './pdf-to-print-test/pdf-to-print-test.component';
import {TableStateOfClaimComponent} from './table-state-of-claim/table-state-of-claim.component';
// Services //
import {TableBasicService} from './services/table-basic.service';
import {PdfTemplateService} from './services/pdf-template.service';
import {TableDyService} from './table-dy/table-dy.service';
import {TableStateOfClaimService} from './table-state-of-claim/table-state-of-claim.service';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableModalDialogComponent,
    ExpandComponent,
    TableDyComponent,
    TableDyModalDialogComponent,
    LoginComponent,
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
            component: TableComponent
        },
        {
            path: 'login',
            component: LoginComponent
        },
        {
            path: 'pdf-to-print',
            component: PdfToPrintTestComponent
        },
        {
            path: 'edit-template',
            component: EditPdfTemplateComponent
        },
        {
            path: 'dy',
            component: TableDyComponent
        },
        {
            path: 'state-of-claim',
            component: TableStateOfClaimComponent
        }
    ])
  ],
  providers: [
      TableBasicService,
      PdfTemplateService,
      TableStateOfClaimService,
      TableDyService
  ],
  entryComponents: [TableModalDialogComponent, TableDyModalDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }


