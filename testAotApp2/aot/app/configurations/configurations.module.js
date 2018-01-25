var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// External package imports.
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
// Application imports.
import { ConfigurationService } from "./configurations.service";
var ConfigurationsModule = /** @class */ (function () {
    function ConfigurationsModule() {
    }
    ConfigurationsModule = __decorate([
        NgModule({
            exports: [
                CommonModule
            ],
            imports: [
                CommonModule
            ],
            // declarations: [],
            providers: [
                // Singleton configuration service with entire app scope.
                // This means that this module must be eagerly loaded such that it is available everywhere.
                ConfigurationService
            ]
        })
    ], ConfigurationsModule);
    return ConfigurationsModule;
}());
export { ConfigurationsModule };
//# sourceMappingURL=configurations.module.js.map