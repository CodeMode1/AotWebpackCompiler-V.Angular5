// External package imports.
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LocalizationModule, TranslationModule } from "angular-l10n";
import { NgModule } from "@angular/core";
import { PasswordModule } from "primeng/primeng";
import { RouterModule, Routes } from "@angular/router";
import { SimpleNotificationsModule } from "angular2-notifications";

// Application imports.
import { EdilexSharedModule } from "../shared/shared.module";


@NgModule({
    declarations: [

    ],
    exports: [
        CommonModule,
        EdilexSharedModule,
        FormsModule,
        HttpClientModule,

        PasswordModule,
        ReactiveFormsModule,
        RouterModule
    ],
    imports: [
        CommonModule,
        EdilexSharedModule,
        FormsModule,
        HttpClientModule,
        LocalizationModule,
        PasswordModule,
        ReactiveFormsModule,
        SimpleNotificationsModule,
        TranslationModule
    ],
    providers: [
    ]
})
export class IdentityModule { }