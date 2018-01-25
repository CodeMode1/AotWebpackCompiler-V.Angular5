var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// External package imports.
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LocalizationModule, TranslationModule } from "angular-l10n";
import { NgModule } from "@angular/core";
import { PasswordModule } from "primeng/primeng";
import { RouterModule } from "@angular/router";
import { SimpleNotificationsModule } from "angular2-notifications";
// Application imports.
import { EdilexSharedModule } from "../shared/shared.module";
var IdentityModule = /** @class */ (function () {
    function IdentityModule() {
    }
    IdentityModule = __decorate([
        NgModule({
            declarations: [],
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
            providers: []
        })
    ], IdentityModule);
    return IdentityModule;
}());
export { IdentityModule };
//# sourceMappingURL=identity.module.js.map