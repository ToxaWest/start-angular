import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAppModule } from './ngmaterial.module';
import { NgxEditorModule } from 'ngx-editor';
// Components //
import { AppComponent } from './app.component';
import { TableDyComponent, TableDyModalDialogComponent, ActionDialogComponent } from './table-dy/table-dy.component';
import { EditPdfTemplateComponent, SafeHtmlPipe } from './edit-pdf-template/edit-pdf-template.component';
import { PdfToPrintTestComponent } from './pdf-to-print-test/pdf-to-print-test.component';
import { TableStateOfClaimComponent } from './table-state-of-claim/table-state-of-claim.component';
import { ExpandComponent } from './expand/expand.component';
import { AlertComponent } from './_directives';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import {MenuComponent} from './menu/menu.component';
// routing //
import { routing } from './app.routing';
// Guard //
import { AuthGuard } from './_guards/';
// Helpers //
import { JwtInterceptor } from './_helpers/';
// Services //
import {
  AlertService,
  AuthenticationService,
  UserService,
  PdfTemplateService,
  TableDyService,
  TableStateOfClaimService,
    MenuItemsService
} from './_services';

@NgModule({
  declarations: [
    AppComponent,
    ExpandComponent,
    TableDyComponent,
    TableDyModalDialogComponent,
      ActionDialogComponent,
      MenuComponent,
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
      MenuItemsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  entryComponents: [TableDyModalDialogComponent, ActionDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }


