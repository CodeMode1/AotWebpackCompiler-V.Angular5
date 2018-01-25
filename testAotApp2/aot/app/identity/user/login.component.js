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
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IdentityService } from './identity.service';
import { FormBuilder, Validators } from "@angular/forms";
// Observable imports.
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/observable/fromEvent';
import { ValidationHelper } from "../../shared/validation/ValidationHelper";
import { NotificationsService } from 'angular2-notifications/services/notifications.service';
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
var LoginComponent = /** @class */ (function (_super) {
    __extends(LoginComponent, _super);
    function LoginComponent(_identityService, _router, _formBuilder, _notificationsService, _locale, _translation) {
        var _this = _super.call(this) || this;
        _this._identityService = _identityService;
        _this._router = _router;
        _this._formBuilder = _formBuilder;
        _this._notificationsService = _notificationsService;
        _this._locale = _locale;
        _this._translation = _translation;
        // Initialization of the form.
        _this.buildForm();
        _this.revert();
        // Toaster title / content.
        _this.toasterTitle = "Login Successful";
        _this.toasterContent = "Congratulations!";
        return _this;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        console.log("LoginComponent.component: entering ngOnInit.");
        // Test observables from events: check for false value on canUserEdit and canUserDelete.
        this.controlEmail = this.loginForm.get('email');
    };
    LoginComponent.prototype.buildForm = function () {
        console.log("Login.component: entering buildForm.");
        this.loginForm = this._formBuilder.group({
            password: ['', [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(500)
                ]
            ],
            email: ['', [
                    Validators.required,
                    ValidationHelper.emailValidator
                ]
            ]
        });
        console.log("Initial form values " + JSON.stringify(this.loginForm.value));
    };
    LoginComponent.prototype.onSubmit = function () {
        console.log("Login.component: entering onSubmit.");
        this._identityService.logoutUser();
        this.loginUserService();
        this.revert();
    };
    LoginComponent.prototype.cancelCreate = function () {
        this.revert();
    };
    // The form is set to pristine state after submit or upon user click.
    LoginComponent.prototype.revert = function () {
        //this.loginForm.reset({
        //    password: "",
        //    email: ""
        //});
        // TODO: Initial value and mark dirty below is just to accelerate DEV. Must be removed in prod.
        this.loginForm.reset({
            password: "Test123*",
            email: "Admin1@test.com"
        });
        this.loginForm.controls['email'].markAsDirty();
    };
    LoginComponent.prototype.prepareLoginUser = function () {
        var createFormModel = this.loginForm.value;
        console.log(JSON.stringify(createFormModel) + " is valid : " + this.loginForm.valid);
        // Deep copy of the changed form model values.
        var loginUser = ({
            password: createFormModel.password,
            email: createFormModel.email
        });
        return loginUser;
    };
    // This is an example of overriding global options.
    LoginComponent.prototype.loginToast = function () {
        this._notificationsService.success(this.toasterTitle, this.toasterContent, {
            // Determine how long a notification should wait before closing. If set to 0 a notification won't close it self.
            timeOut: 5000,
            // Determine if a progress bar should be shown or not.
            showProgressBar: true,
            // Determines if new notifications should appear at the bottom or top of the list.
            pauseOnHover: false,
            // Determines if notifications should close on click.
            clickToClose: true,
            // Set the maximum allowed length of the content string. If set to 0 or not defined there is no maximum length.
            maxLength: 20,
            lastOnBottom: true,
            //Set the position on the screen where the notifications should display. Pass an array with two values example: ["top", "left"].
            position: ["bottom", "right"],
            // Set the maximum number of notifications that can be on the screen at once.
            maxStack: 10,
            // If true prevents duplicates of open notifications.
            preventDuplicates: true,
            // If set to "all" prevents duplicates of the latest notification shown (even if it isn't on screen any more ). If set to "visible" only prevents duplicates of the last created notification if the notification is currently visible.
            preventLastDuplicates: "visible",
            // "fromRight" or "fromLeft" or "scale" or "rotate" or null : Choose the type of animation or set the value to null not to display animations.
            animate: "fromRight"
        });
        // Check for value changes on the control email. Avec debounce on attend un délai particulier avant d'émettre une valeur (même principe que throttleTime mais avec délai).
        //this.controlEmail.valueChanges
        //    .debounceTime(2000)
        //    .subscribe(newValue => console.log("new value : " + newValue));
        return true;
    };
    LoginComponent.prototype.loginUserService = function () {
        var _this = this;
        var loginUser = this.prepareLoginUser();
        this.sub = this._identityService.loginUserAPI(loginUser)
            .subscribe(function (data) {
            //localStorage.setItem('token', data.token);
            console.log("User successfully logged in: " + JSON.stringify(loginUser));
            var respToaster = _this.loginToast();
            if (respToaster) {
                console.log("Toaster completed.");
                _this.redirectHome();
            }
        }, function (error) {
            console.log("Cannot login user: " + loginUser.email);
            _this.revert();
        });
    };
    LoginComponent.prototype.redirectHome = function () {
        console.log("Redirect home at this Url : " + "/home");
        //var timer = setTimeout(() => this._router.navigateByUrl("/home"), 5000);
        this._router.navigateByUrl("/home");
    };
    /* Unsubscribe from any subcriptions to flee any leaks to the component */
    LoginComponent.prototype.ngOnDestroy = function () {
        if (this.sub != null && typeof (this.sub) != "undefined") {
            this.sub.unsubscribe();
            console.log("LoginUser.component: unsubscribe.");
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], LoginComponent.prototype, "logAdmin", void 0);
    LoginComponent = __decorate([
        Component({
            selector: 'my-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        }),
        __metadata("design:paramtypes", [IdentityService, Router, FormBuilder,
            NotificationsService,
            LocaleService,
            TranslationService])
    ], LoginComponent);
    return LoginComponent;
}(Translation));
export { LoginComponent };
//# sourceMappingURL=login.component.js.map