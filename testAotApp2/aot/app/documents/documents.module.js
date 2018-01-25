var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// External package imports.
// Prime NG modules : paginator, data grid, calendar.
// ConfirmDialog is defined using p-confirmDialog tag and an instance of ConfirmationService
//    is required to display it by calling confirm method.
import { AutoCompleteModule, CalendarModule, ConfirmDialogModule, DragDropModule, DropdownModule, EditorModule, InputTextModule, ListboxModule, MultiSelectModule, PaginatorModule, RadioButtonModule, SelectButtonModule, SharedModule, TabViewModule } from "primeng/primeng";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { LocalizationModule, TranslationModule } from "angular-l10n";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
// SimpleNotificationsModule : https://github.com/flauc/angular2-notifications/blob/master/docs/toastNotifications.md
import { SimpleNotificationsModule } from "angular2-notifications";
// Application imports.
import { ConfigurationsModule } from "../configurations/configurations.module";
import { EdilexSharedModule } from "../shared/shared.module";
var DocumentsModule = /** @class */ (function () {
    function DocumentsModule() {
    }
    DocumentsModule = __decorate([
        NgModule({
            declarations: [],
            exports: [
                CommonModule,
                ConfigurationsModule,
                FormsModule,
                HttpClientModule,
                ReactiveFormsModule,
                RouterModule,
                SharedModule
            ],
            imports: [
                AutoCompleteModule,
                CalendarModule,
                CommonModule,
                ConfigurationsModule,
                ConfirmDialogModule,
                DragDropModule,
                DropdownModule,
                EdilexSharedModule,
                EditorModule,
                FormsModule,
                HttpClientModule,
                InputTextModule,
                ListboxModule,
                LocalizationModule,
                MultiSelectModule,
                PaginatorModule,
                RadioButtonModule,
                ReactiveFormsModule,
                SelectButtonModule,
                SharedModule,
                SimpleNotificationsModule,
                TabViewModule,
                TranslationModule
            ],
            providers: []
        })
    ], DocumentsModule);
    return DocumentsModule;
}());
export { DocumentsModule };
//# sourceMappingURL=documents.module.js.map