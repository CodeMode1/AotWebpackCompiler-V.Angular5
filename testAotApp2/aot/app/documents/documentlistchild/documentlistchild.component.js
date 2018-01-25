var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Document } from '../document';
import { Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { IdentityService } from '../../identity/user/identity.service';
import { ConfirmDialogService } from '../../shared/confirmdialog/confirmdialog.service';
var DocumentListChildComponent = /** @class */ (function () {
    function DocumentListChildComponent(_documentService, _router, _identityService, _confirmDialogService) {
        this._documentService = _documentService;
        this._router = _router;
        this._identityService = _identityService;
        this._confirmDialogService = _confirmDialogService;
        this.isChildDeleted = new EventEmitter();
        this.canUserDelete = false;
    }
    // Initialization of component properties.
    DocumentListChildComponent.prototype.ngOnInit = function () {
        // Delete document if user has perm_document_delete permission : Inject the identity service and check the user has the permissions by name before redirecting.
        if (this._identityService.userHasPermission('perm_document_delete')) {
            this.canUserDelete = true;
        }
    };
    DocumentListChildComponent.prototype.ngOnChanges = function (changes) {
        if (typeof (changes["parentDocument"]) != 'undefined') {
            console.log("In on changes : " + JSON.stringify(this.parentDocument));
            // Hard copy of the parent project.
            this.childDocument = Object.assign({}, this.parentDocument);
        }
    };
    DocumentListChildComponent.prototype.redirectEditDoc = function (id) {
        this._router.navigateByUrl("documents/" + id);
    };
    DocumentListChildComponent.prototype.confirmDelete = function (childDocument) {
        var _this = this;
        /* options:
                header: Header text of the dialog.
                icon: Icon to display next to the message.
                message: Message of the confirmation.
                key: Optional key to match the key of the confirm dialog, necessary to use when component tree has multiple confirm dialogs.
                accept: Callback to execute when action is confirmed.
                reject: Callback to execute when action is rejected.
        */
        var header = 'Confirm Suppression';
        var icon = 'fa fa-question-circle';
        var message = "Are you sure that you want to delete document " + childDocument.name + " ?";
        var accept = function () {
            //Callback to execute when action is accepted.
            console.log("confirmDelete accepted.");
            _this.childDocument = childDocument;
            //this.deleteDocument();
        };
        var reject = function () {
            //Callback to execute when action is rejected.
            console.log("confirmDelete rejected. deleteDocument escaped.");
        };
        var acceptLabel = 'Oui';
        var rejectLabel = 'Non';
        var width = 600;
        //const confirmation = new Confirmation(message, null, icon, header, accept, reject, acceptLabel, rejectLabel, width);
        // Pass a confirmaiton object to the service so it can set the dialog properties.
        //this._confirmDialogService.displayConfirmDialog(confirmation);
    };
    __decorate([
        Input(),
        __metadata("design:type", Document)
    ], DocumentListChildComponent.prototype, "parentDocument", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], DocumentListChildComponent.prototype, "isChildDeleted", void 0);
    DocumentListChildComponent = __decorate([
        Component({
            selector: 'document-list-child',
            templateUrl: './documentlistchild.component.html',
            styleUrls: ['./documentlistchild.component.css']
        }),
        __metadata("design:paramtypes", [DocumentService,
            Router,
            IdentityService,
            ConfirmDialogService])
    ], DocumentListChildComponent);
    return DocumentListChildComponent;
}());
export { DocumentListChildComponent };
//# sourceMappingURL=documentlistchild.component.js.map