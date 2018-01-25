var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// External package imports.
import { CommonModule } from "@angular/common";
// ConfirmDialog is defined using p-confirmDialog tag and an instance of
//   ConfirmationService is required to display it by calling confirm method.
import { ConfirmationService, ConfirmDialogModule, DialogModule } from "primeng/primeng";
import { NgModule } from "@angular/core";
// Application imports.
import { ConfirmDialogComponent } from "./confirmdialog/confirmdialog.component";
import { ConfirmDialogService } from "./confirmdialog/confirmdialog.service";
//import { ErrorDialogComponent } from "./errorreporting/errordialog.component";
//import { ErrorDialogService } from "./errorreporting/errordialog.service";
import { ValidationMessagesComponent } from "./validation/validationmessages.component";
var EdilexSharedModule = /** @class */ (function () {
    function EdilexSharedModule() {
    }
    EdilexSharedModule = __decorate([
        NgModule({
            declarations: [
                ConfirmDialogComponent,
                //ErrorDialogComponent,
                ValidationMessagesComponent
            ],
            exports: [
                CommonModule,
                ConfirmDialogComponent,
                ConfirmDialogModule,
                DialogModule,
                //ErrorDialogComponent,
                ValidationMessagesComponent
            ],
            imports: [
                CommonModule,
                ConfirmDialogModule,
                DialogModule
            ],
            providers: [
                ConfirmationService,
                ConfirmDialogService
                //ErrorDialogService
            ]
        })
    ], EdilexSharedModule);
    return EdilexSharedModule;
}());
export { EdilexSharedModule };
//# sourceMappingURL=shared.module.js.map