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
    { path: 'claims_registry', component: TableStateOfClaimComponent },
    { path: 'edit-template', component: EditPdfTemplateComponent , canActivate: [AuthGuard]},
    { path: 'init', component: TableDyComponent},
    {
        path: 'claims',
        children: [
            { path: '', redirectTo: 'claims_registry', pathMatch: 'full' },
            {
                path: 'claims_registry',
                component: TableStateOfClaimComponent,
            },
            {
                path: 'claim_reject',
                redirectTo: ''
            },
            {
                path: 'claim_act',
                redirectTo: ''
            },
            {
                path: 'claim_accept',
                redirectTo: ''
            }
        ]
    },
    {
        path: 'dictates',
        children: [
            { path: '', redirectTo: 'dictates_registry', pathMatch: 'full' },
            {
                path: 'dictates_registry',
                redirectTo: ''
            },
            {
                path: 'dictates_reject',
                redirectTo: ''
            },
            {
                path: 'dictates_act',
                redirectTo: ''
            },
            {
                path: 'dictates_accept',
                redirectTo: ''
            }
        ]
    },
    {
        path: 'reports',
        children: [
            { path: '', redirectTo: 'report1', pathMatch: 'full' },
            {
                path: 'report1',
                redirectTo: ''
            },
            {
                path: 'report2',
                redirectTo: ''
            }
        ]
    },
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }

];

export const routing = RouterModule.forRoot(appRoutes);
