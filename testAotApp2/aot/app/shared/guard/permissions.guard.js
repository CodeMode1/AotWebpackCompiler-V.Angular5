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
// For toaster display when can't edit or delete.
import { NotificationsService } from 'angular2-notifications';
var PermissionsGuard = /** @class */ (function () {
    function PermissionsGuard(_router, _identityService, _notificationsService) {
        this._router = _router;
        this._identityService = _identityService;
        this._notificationsService = _notificationsService;
    }
    PermissionsGuard.prototype.canActivate = function (_route, _state) {
        var targetUrl = _state.url;
        console.log("Route-Target", targetUrl);
        var claims = _route.data["claims"];
        // No claims attached to the route.
        if (claims.length < 0) {
            return false;
        }
        for (var i = 0; i < claims.length;) {
            var isGranted = this._identityService.userHasPermission(claims[i]);
            console.log("Is allowed?: " + isGranted);
            if (!isGranted) {
                console.log("Route " + targetUrl + " access attempt failed. Permission failed: " + claims[i]);
                this._identityService.showToast("permissions");
                return false;
            }
            i++;
        }
        console.log("Route " + targetUrl + " access attempt succeeded.");
        // Claims are granted to the user.
        return true;
    };
    PermissionsGuard.prototype.canActivateChild = function (_route, _state) {
        return this.canActivate(_route, _state);
    };
    PermissionsGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Router, typeof (_a = typeof IdentityService !== "undefined" && IdentityService) === "function" && _a || Object, NotificationsService])
    ], PermissionsGuard);
    return PermissionsGuard;
    var _a;
}());
export { PermissionsGuard };
//# sourceMappingURL=permissions.guard.js.map