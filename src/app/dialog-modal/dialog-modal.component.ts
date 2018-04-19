import {Component, NgModule} from '@angular/core';
import {MatDialog} from '@angular/material';

@NgModule({
    exports: [
        MatDialog,
    ],
})
@Component({
  selector: 'app-dialog-modal',
  templateUrl: './dialog-modal.component.html',
  styleUrls: ['./dialog-modal.component.css']
})
export class DialogModalComponent {
    constructor(public dialog: MatDialog) {}

    openDialog() {
        console.log('asd');
        const dialogRef = this.dialog.open(DialogContentModal, {
            height: '650px'
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }
}

@Component({
    selector: 'dialog-content-modal',
    templateUrl: 'dialog-content-modal.html'
})
export class DialogContentModal {}