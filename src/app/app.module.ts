import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAppModule } from './ngmaterial.module';
import { ExpandComponent } from './expand/expand.component';
import { NgxEditorModule } from 'ngx-editor';
// Components //
import { AppComponent } from './app.component';
import { TableComponent, TableModalDialogComponent} from './table-general-info/table-general-info';
import { TableDyComponent, TableDyModalDialogComponent } from './table-dy/table-dy.component';
import {EditPdfTemplateComponent, SafeHtmlPipe} from './edit-pdf-template/edit-pdf-template.component';
import {PdfToPrintTestComponent} from './pdf-to-print-test/pdf-to-print-test.component';
import {TableStateOfClaimComponent} from './table-state-of-claim/table-state-of-claim.component';
// Services //
import {TableBasicService} from './services/table-basic.service';
import {PdfTemplateService} from './services/pdf-template.service';
import {TableDyService} from './table-dy/table-dy.service';
import {TableStateOfClaimService} from './table-state-of-claim/table-state-of-claim.service';

import { fakeBackendProvider } from './_helpers/';
import { routing } from './app.routing';

import { AlertComponent } from './_directives/';
import { AuthGuard } from './_guards/';
import { JwtInterceptor } from './_helpers/';
import { AlertService, AuthenticationService, UserService } from './_services/';
import { HomeComponent } from './home/';
import { LoginComponent } from './login/';
import { RegisterComponent } from './register/';


@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableModalDialogComponent,
    ExpandComponent,
    TableDyComponent,
    TableDyModalDialogComponent,
    SafeHtmlPipe,
    PdfToPrintTestComponent,
    EditPdfTemplateComponent,
    TableStateOfClaimComponent,
    AlertComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent
],
  imports: [
    BrowserModule,
    FormsModule,
    TableComponent,
    MaterialAppModule,
    HttpClientModule,
    NgxEditorModule,
    routing,
    BrowserAnimationsModule
  ],
  providers: [
    TableBasicService,
    PdfTemplateService,
    TableStateOfClaimService,
    TableDyService,
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    // provider used to create fake backend
    fakeBackendProvider
  ],
  entryComponents: [TableModalDialogComponent, TableDyModalDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }


