import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// ConfirmDialog is defined using p-confirmDialog tag and an instance of ConfirmationService is required to display it by calling confirm method.
import { ConfirmDialogService } from './confirmdialog.service';

@Component({
    selector: 'confirm-dialog',
    templateUrl: './confirmdialog.component.html'
})

export class ConfirmDialogComponent {

    constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private _confirmDialogService: ConfirmDialogService) {
        this._confirmDialogService.init(this);
    }


}