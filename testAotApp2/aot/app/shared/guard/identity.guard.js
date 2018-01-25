var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityService } from '../../identity/user/identity.service';
var IdentityGuard = /** @class */ (function () {
    function IdentityGuard(_router, _identityService) {
        this._router = _router;
        this._identityService = _identityService;
    }
    IdentityGuard.prototype.canActivate = function () {
        // Change verif on token for this.authenticated.
        if (this._identityService.isAuthenticated) {
            // logged in so return true
            console.log("Login guard succeeded : " + this._identityService.token);
            return true;
        }
        else {
            // If not authenticated, show an unauthorized toast.
            this._identityService.showToast("error");
        }
        console.log("Login guard failed : " + this._identityService.token);
        // not logged in so redirect to _userService page
        this._router.navigateByUrl("/user/login");
        return false;
    };
    IdentityGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router, typeof (_a = typeof IdentityService !== "undefined" && IdentityService) === "function" && _a || Object])
    ], IdentityGuard);
    return IdentityGuard;
    var _a;
}());
export { IdentityGuard };
//# sourceMappingURL=identity.guard.js.map