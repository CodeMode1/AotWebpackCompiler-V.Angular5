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
import { IdentityService } from './identity.service';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
var UserComponent = /** @class */ (function (_super) {
    __extends(UserComponent, _super);
    function UserComponent(_identityService, _locale, _translation) {
        var _this = _super.call(this) || this;
        _this._identityService = _identityService;
        _this._locale = _locale;
        _this._translation = _translation;
        return _this;
    }
    UserComponent.prototype.ngOnInit = function () {
    };
    /* Call logout method on user service */
    UserComponent.prototype.logoutUser = function () {
        this._identityService.logoutUser();
    };
    /* Unsubscribe from any subcriptions to flee any leaks to the component */
    UserComponent.prototype.ngOnDestroy = function () {
        if (this.sub != null && typeof (this.sub) != "undefined") {
            this.sub.unsubscribe();
            console.log("User.component: unsubscribe.");
        }
    };
    UserComponent = __decorate([
        Component({
            selector: 'my-user',
            templateUrl: './user.component.html',
            styleUrls: ['./user.component.css']
        }),
        __metadata("design:paramtypes", [IdentityService,
            LocaleService,
            TranslationService])
    ], UserComponent);
    return UserComponent;
}(Translation));
export { UserComponent };
//# sourceMappingURL=user.component.js.map