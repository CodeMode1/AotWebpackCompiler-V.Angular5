var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
// For toaster display when can't edit or delete.
import { NotificationsService } from 'angular2-notifications';
var IdentityService = /** @class */ (function () {
    function IdentityService(_http, _notificationsService) {
        this._http = _http;
        this._notificationsService = _notificationsService;
        // Create the event emitter that will be outputed and allowed to subscribe to.
        this.eventUser = new EventEmitter();
        this._securityBaseUrl = 'api/security';
        this.logoutUser();
        this._permissionsDictionary = new Map();
        this._claimsDictionary = new Map();
        this.options = {
            "timeOut": 2000,
            "position": ["top", "right"],
            lastOnBottom: true
        };
    }
    IdentityService.prototype.ngOnInit = function () {
    };
    Object.defineProperty(IdentityService.prototype, "isAuthenticated", {
        // Get the isAuthenticated property.
        get: function () {
            return this._isAuthenticated;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IdentityService.prototype, "userEmail", {
        // Get the userEmail property.
        get: function () {
            return this._userEmail;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IdentityService.prototype, "userLanguageCode", {
        // Get the userLanguageCode property.
        get: function () {
            return this._userLanguageCode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IdentityService.prototype, "token", {
        // Get the token property.
        get: function () {
            return this._token;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IdentityService.prototype, "isAdmin", {
        // Get the isAdmin property.
        get: function () {
            return this._isAdmin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(IdentityService.prototype, "permissionsDictionary", {
        // Get the permissions dictionary.
        get: function () {
            return this._permissionsDictionary;
        },
        enumerable: true,
        configurable: true
    });
    // Flush jwt token and logs out the user.
    IdentityService.prototype.logoutUser = function () {
        this._isAuthenticated = false;
        this._userEmail = "";
        this._userLanguageCode = "";
        this._token = "";
        // Local Storage clearing of token property.
        //localStorage.clear();
        this._isAdmin = false;
        this._permissionsDictionary = new Map();
        this._claimsDictionary = new Map();
        // Emit User event to set the event login true.
        this.eventUser.emit(false);
        console.log("Current user logged out.");
    };
    IdentityService.prototype.getHeaders = function () {
        // Add authorization header with jwt token.
        var headers = new Headers({ 'Authorization': 'Bearer ' + this._token, 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        return options;
    };
    IdentityService.prototype.loginUserAPI = function (user) {
        var _this = this;
        var options = this.getHeaders();
        var body = JSON.stringify(user);
        return this._http.post(this._securityBaseUrl + "/login", body, options)
            .map(function (response) { return response.json(); })
            .do(function (data) { return _this.loginUser(data); })
            .catch(function (error) { return error.json(); });
    };
    IdentityService.prototype.createUserAPI = function (user) {
        var options = this.getHeaders();
        var body = JSON.stringify(user);
        return this._http.post(this._securityBaseUrl + "/users", body, options)
            .map(function (response) { return response.json(); })
            .catch(function (error) { return error.json(); });
    };
    IdentityService.prototype.loginUser = function (data) {
        var strippedToken = data.token;
        this._token = strippedToken;
        this._userLanguageCode = data.languageCode;
        var claims = data.claims;
        // Set key/value : type/claim value in the _permissionsDictionary.
        for (var x in claims) {
            if (claims[x].type.substring(0, 5) == "perm_") {
                this._permissionsDictionary.set(claims[x].type, claims[x].value);
            }
            else {
                // Identity claims.
                this._claimsDictionary.set(claims[x].type, claims[x].value);
            }
        }
        if (this._claimsDictionary.has("email")) {
            this._userEmail = this._claimsDictionary.get("email");
            console.log("email user loggue: " + this._userEmail);
        }
        if (this._claimsDictionary.has("superUser")) {
            this._isAdmin = this._claimsDictionary.get("superUser");
            console.log("_isAdmin? : " + this._isAdmin);
        }
        this._isAuthenticated = true;
        // Emit User event to set the event login true.
        this.eventUser.emit(true);
        console.log("Is authenticated: " + this._isAuthenticated);
        console.log("Is authenticated: " + this._isAuthenticated);
        console.log("User is Admin: " + this._isAdmin);
        console.log("User email: " + this._userEmail);
        console.log("Token from service: ");
        console.log(this._token);
    };
    // TODO: handle permissions (claim name is permission)
    IdentityService.prototype.userHasPermission = function (name) {
        if (this._permissionsDictionary.has(name)) {
            return true;
        }
        return false;
    };
    IdentityService.prototype.getClaimByName = function (name) {
        if (this._claimsDictionary.has(name)) {
            return this._claimsDictionary.get(name);
        }
        return null;
    };
    // If the guard is not allowed (the user has not permissions display a toaster).
    IdentityService.prototype.showToast = function (type) {
        var type;
        // switch case on error type.
        switch (type) {
            case "error":
                this.toasterTitle = "Access Error";
                this.toasterContent = "Unauthorized access";
                break;
            case "permissions":
                this.toasterTitle = "Permission Restriction";
                this.toasterContent = "Unauthorized access";
                break;
        }
        // Create toaster with basic properties. Use throttleTime(dur) sur un stream to ignore subsequent values for duration milliseconds. 
        this.toaster = this._notificationsService.error(this.toasterTitle, this.toasterContent, {
            // Determine how long a notification should wait before closing. If set to 0 a notification won't close it self.
            timeOut: this.options["timeOut"],
            // Determine if a progress bar should be shown or not.
            showProgressBar: true,
            // Determines if new notifications should appear at the bottom or top of the list.
            pauseOnHover: false,
            // Determines if notifications should close on click.
            clickToClose: false,
            // Set the maximum allowed length of the content string. If set to 0 or not defined there is no maximum length.
            maxLength: 20,
            lastOnBottom: true,
            //Set the position on the screen where the notifications should display. Pass an array with two values example: ["top", "left"].
            position: this.options["position"],
            // Set the maximum number of notifications that can be on the screen at once.
            maxStack: 1,
            // If true prevents duplicates of open notifications.
            preventDuplicates: true,
            // If set to "all" prevents duplicates of the latest notification shown (even if it isn't on screen any more ). If set to "visible" only prevents duplicates of the last created notification if the notification is currently visible.
            preventLastDuplicates: "all",
            // "fromRight" or "fromLeft" or "scale" or "rotate" or null : Choose the type of animation or set the value to null not to display animations.
            animate: null
        });
        return true;
    };
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], IdentityService.prototype, "eventUser", void 0);
    IdentityService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, NotificationsService])
    ], IdentityService);
    return IdentityService;
}());
export { IdentityService };
//# sourceMappingURL=identity.service.js.map