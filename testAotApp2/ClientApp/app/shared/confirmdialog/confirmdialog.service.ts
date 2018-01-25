import { Http, Headers, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Injectable } from '@angular/core';

import { ConfirmationService } from 'primeng/primeng';
import { ConfirmDialogComponent } from './confirmdialog.component';

@Injectable()
export class ConfirmDialogService {
    // Service to inject everywhere which encapsulates ConfirmationService from Prime NG.

    private _confirmComponent: ConfirmDialogComponent;

    constructor(private _http: Http, private _confirmationService: ConfirmationService) {
    }

    init(confirmDialogRef: ConfirmDialogComponent): void {
        // A reference of the component is passed here.
        this._confirmComponent = confirmDialogRef;
    }

    displayConfirmDialog(confirmation: any): void {
        // Set Properties recevied from our custom confirm dialog component.
        // Confirmation object to pass to the confirm method of the confirm dialog.
        const confirmationDialog = { header: confirmation.header, icon: confirmation.icon, message: confirmation.message, accept: confirmation.accept, reject: confirmation.reject };
        // Call confirm Service which is in ConfirmDialogComponent Service.
        this._confirmationService.confirm(confirmationDialog);
    }
}

