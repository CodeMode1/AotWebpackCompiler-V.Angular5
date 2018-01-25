// External package imports.
// Required by SimpleNotificationsModule V0.7 and later.
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { L10nConfig, L10nLoader, LocalizationModule, StorageStrategy } from "angular-l10n";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
// SimpleNotificationsModule :
//   http://flauc.github.io/angular2-notifications/
//   https://github.com/flauc/angular2-notifications
import { SimpleNotificationsModule } from "angular2-notifications";

// Application imports
import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from "./components/home/home.component";
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { ConfigurationsModule } from './configurations/configurations.module';
import { DocumentsModule } from "./documents/documents.module";
import { EdilexSharedModule } from "./shared/shared.module";
import { IdentityModule } from "./identity/identity.module";

import { translationEn } from "./shared/resources/locale-en";
import { translationFr } from "./shared/resources/locale-fr";
// ReSharper disable once InconsistentNaming
const l10nConfig: L10nConfig = {
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

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        HomeComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent
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
                component: CounterComponent,
                path: 'counter'
            },
            {
                component: FetchDataComponent,
                path: 'fetch-data'
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
})
export class AppModule {
    // ReSharper disable once InconsistentNaming
    constructor(public l10nLoader: L10nLoader) {
        this.l10nLoader.load();
    }
}

export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
