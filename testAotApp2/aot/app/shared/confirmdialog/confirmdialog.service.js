var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Injectable } from '@angular/core';
import { ConfirmationService } from 'primeng/primeng';
var ConfirmDialogService = /** @class */ (function () {
    function ConfirmDialogService(_http, _confirmationService) {
        this._http = _http;
        this._confirmationService = _confirmationService;
    }
    ConfirmDialogService.prototype.init = function (confirmDialogRef) {
        // A reference of the component is passed here.
        this._confirmComponent = confirmDialogRef;
    };
    ConfirmDialogService.prototype.displayConfirmDialog = function (confirmation) {
        // Set Properties recevied from our custom confirm dialog component.
        this._confirmComponent.setProperties(confirmation.width, confirmation.acceptLabel, confirmation.rejectLabel);
        // Confirmation object to pass to the confirm method of the confirm dialog.
        var confirmationDialog = { header: confirmation.header, icon: confirmation.icon, message: confirmation.message, accept: confirmation.accept, reject: confirmation.reject };
        // Call confirm Service which is in ConfirmDialogComponent Service.
        this._confirmationService.confirm(confirmationDialog);
    };
    ConfirmDialogService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, ConfirmationService])
    ], ConfirmDialogService);
    return ConfirmDialogService;
}());
export { ConfirmDialogService };
//# sourceMappingURL=confirmdialog.service.js.map