var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
var DocumentComponent = /** @class */ (function (_super) {
    __extends(DocumentComponent, _super);
    function DocumentComponent(_activatedRoute, _router, _locale, _translation) {
        var _this = _super.call(this) || this;
        _this._activatedRoute = _activatedRoute;
        _this._router = _router;
        _this._locale = _locale;
        _this._translation = _translation;
        console.log(_this._activatedRoute.snapshot.params["id"]);
        _this.projectId = _this._activatedRoute.snapshot.params["id"];
        // Subscribe on changed url to get current routed component
        _this.sub = _this._router.events.subscribe(function (events) {
            var currentUrl = _this._router.routerState.snapshot.url;
            console.log("current url : " + currentUrl);
            if (currentUrl.includes("create")) {
                _this.isModeCreate = true;
            }
            if (currentUrl.includes("edit")) {
                _this.isModeCreate = false;
            }
        });
        return _this;
    }
    DocumentComponent.prototype.ngOnInit = function () {
    };
    DocumentComponent.prototype.ngOnDestroy = function () {
        //this._router.dispose();
        if (this.sub != null && typeof (this.sub) != 'undefined') {
            console.log("Unsubscribe from ressources.");
            this.sub.unsubscribe();
        }
    };
    DocumentComponent = __decorate([
        Component({
            selector: 'main-document',
            templateUrl: './document.component.html'
        }),
        __metadata("design:paramtypes", [ActivatedRoute, Router,
            LocaleService,
            TranslationService])
    ], DocumentComponent);
    return DocumentComponent;
}(Translation));
export { DocumentComponent };
//# sourceMappingURL=document.component.js.map