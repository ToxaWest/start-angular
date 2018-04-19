import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialAppModule } from './ngmaterial.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import {TableComponent, TableModalDialog} from './table-basic-example/table-basic-example';
import { TabsComponent } from './tabs/tabs.component';
import { DialogModalComponent , DialogContentModal } from './dialog-modal/dialog-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    TableComponent,
    TabsComponent,
    DialogModalComponent,
    DialogContentModal,
    TableModalDialog
  ],
  imports: [
      BrowserModule,
      FormsModule,
      TableComponent,
      MaterialAppModule,
      BrowserAnimationsModule
  ],
  providers: [],
  entryComponents: [DialogContentModal, DialogModalComponent, TableModalDialog],
  bootstrap: [AppComponent ,DialogModalComponent , TableModalDialog]
})
export class AppModule { }
