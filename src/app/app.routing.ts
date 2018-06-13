import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/';
import { LoginComponent } from './login/';
import { RegisterComponent } from './register/';
import { AuthGuard } from './_guards/';
import {EditPdfTemplateComponent} from './edit-pdf-template/edit-pdf-template.component';
import {TableDyComponent} from './table-dy/table-dy.component';
import {PdfToPrintTestComponent} from './pdf-to-print-test/pdf-to-print-test.component';
import {TableStateOfClaimComponent} from './table-state-of-claim/table-state-of-claim.component';

const appRoutes: Routes = [
    { path: 'pdf-to-print', component: PdfToPrintTestComponent },
    { path: 'edit-template', component: EditPdfTemplateComponent , canActivate: [AuthGuard]},
    { path: 'init', component: TableDyComponent},
    { path: 'claims', component: TableStateOfClaimComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }

];

export const routing = RouterModule.forRoot(appRoutes);
