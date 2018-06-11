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
import { TableDyComponent, TableDyModalDialogComponent } from './table-dy/table-dy.component';
import {EditPdfTemplateComponent, SafeHtmlPipe} from './edit-pdf-template/edit-pdf-template.component';
import {PdfToPrintTestComponent} from './pdf-to-print-test/pdf-to-print-test.component';
import {TableStateOfClaimComponent} from './table-state-of-claim/table-state-of-claim.component';
import { AlertComponent } from './_directives/';
import { HomeComponent } from './home/';
import { LoginComponent } from './login/';
import { RegisterComponent } from './register/';

// Services //
import { fakeBackendProvider } from './_helpers/';
import { routing } from './app.routing';
import { AuthGuard } from './_guards/';
import { JwtInterceptor } from './_helpers/';
import {
  AlertService,
  AuthenticationService,
  UserService,
  PdfTemplateService,
  TableDyService,
  TableStateOfClaimService
} from './_services/';



@NgModule({
  declarations: [
    AppComponent,
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
    MaterialAppModule,
    HttpClientModule,
    NgxEditorModule,
    routing,
    BrowserAnimationsModule
  ],
  providers: [
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
  entryComponents: [TableDyModalDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }


