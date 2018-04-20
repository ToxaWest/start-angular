import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAppModule } from './ngmaterial.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { TableComponent, TableModalDialog} from './table-basic-example/table-basic-example';
import { TabsComponent } from './tabs/tabs.component';
import { ExpandComponent } from './expand/expand.component';
import {TableDyComponent, TableDyModalDialog} from './table-dy/table-dy.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    TableComponent,
    TabsComponent,
    TableModalDialog,
    ExpandComponent,
    TableDyComponent,
    TableDyModalDialog,
],
  imports: [
      BrowserModule,
      FormsModule,
      TableComponent,
      MaterialAppModule,
      BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [TableModalDialog, TableDyModalDialog],
  bootstrap: [AppComponent]
})
export class AppModule { }
