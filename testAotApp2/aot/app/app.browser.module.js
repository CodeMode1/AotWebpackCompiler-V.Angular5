import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppModuleShared } from './app.shared.module';
import { AppComponent } from './components/app/app.component';
var AppModule = (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: NgModule, args: [{
                    bootstrap: [AppComponent],
                    imports: [
                        BrowserModule,
                        AppModuleShared
                    ],
                    providers: [
                        { provide: 'BASE_URL', useFactory: getBaseUrl }
                    ]
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = function () { return []; };
    return AppModule;
}());
export { AppModule };
export function getBaseUrl() {
    return document.getElementsByTagName('base')[0].href;
}
//# sourceMappingURL=app.browser.module.js.map