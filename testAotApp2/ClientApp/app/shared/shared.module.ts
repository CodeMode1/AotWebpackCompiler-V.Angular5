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


@NgModule({
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
export class EdilexSharedModule { }
