var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// External package imports.
// Required by SimpleNotificationsModule V0.7 and later.
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { L10nLoader, LocalizationModule, StorageStrategy } from "angular-l10n";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
// SimpleNotificationsModule :
//   http://flauc.github.io/angular2-notifications/
//   https://github.com/flauc/angular2-notifications
import { SimpleNotificationsModule } from "angular2-notifications";
// Application imports
import { AppComponent } from './components/app/app.component';
import { ConfigurationsModule } from './configurations/configurations.module';
import { DocumentsModule } from "./documents/documents.module";
import { EdilexSharedModule } from "./shared/shared.module";
import { HomeComponent } from "./components/home/home.component";
import { IdentityModule } from "./identity/identity.module";
import { translationEn } from "./shared/resources/locale-en";
import { translationFr } from "./shared/resources/locale-fr";
// ReSharper disable once InconsistentNaming
var l10nConfig = {
    locale: {
        currency: "CAD",
        defaultLocale: { languageCode: "en", countryCode: "CA" },
        languages: [
            { code: "en", dir: "ltr" },
            { code: "fr", dir: "ltr" }
        ],
        storage: StorageStrategy.Cookie
    },
    translation: {
        caching: true,
        missingValue: "translation_no_key",
        // Direct loading !
        translationData: [
            { languageCode: "en", data: translationEn },
            { languageCode: "fr", data: translationFr }
        ]
    }
};
var AppModule = /** @class */ (function () {
    // ReSharper disable once InconsistentNaming
    function AppModule(l10nLoader) {
        this.l10nLoader = l10nLoader;
        this.l10nLoader.load();
    }
    AppModule = __decorate([
        NgModule({
            bootstrap: [AppComponent],
            declarations: [
                AppComponent,
                HomeComponent
            ],
            imports: [
                BrowserAnimationsModule,
                BrowserModule,
                ConfigurationsModule,
                DocumentsModule,
                EdilexSharedModule,
                FormsModule,
                HttpClientModule,
                IdentityModule,
                LocalizationModule.forRoot(l10nConfig),
                ReactiveFormsModule,
                SimpleNotificationsModule.forRoot(),
                RouterModule.forRoot([
                    {
                        path: "",
                        pathMatch: "full",
                        redirectTo: "home"
                    },
                    {
                        component: HomeComponent,
                        path: "home"
                    },
                    {
                        path: "**",
                        redirectTo: "home"
                    }
                ])
            ],
            providers: [
                { provide: 'BASE_URL', useFactory: getBaseUrl }
            ]
        }),
        __metadata("design:paramtypes", [L10nLoader])
    ], AppModule);
    return AppModule;
}());
export { AppModule };
export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
//# sourceMappingURL=app.module.js.map