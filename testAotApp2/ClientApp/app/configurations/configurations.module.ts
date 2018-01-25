// External package imports.
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

// Application imports.
import { ConfigurationService } from "./configurations.service";


@NgModule({
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
export class ConfigurationsModule { }
