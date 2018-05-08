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
],
  imports: [
    BrowserModule,
    FormsModule,
    TableComponent,
    MaterialAppModule,
    BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [TableModalDialogComponent, TableDyModalDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
