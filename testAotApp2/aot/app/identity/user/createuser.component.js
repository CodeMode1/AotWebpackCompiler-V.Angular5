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
import { Router } from '@angular/router';
import { IdentityService } from './identity.service';
import { FormBuilder, Validators } from "@angular/forms";
import { ValidationHelper } from "../../shared/validation/ValidationHelper";
import { Translation, LocaleService, TranslationService } from 'angular-l10n';
var CreateUserComponent = /** @class */ (function (_super) {
    __extends(CreateUserComponent, _super);
    function CreateUserComponent(_identityService, _router, _formBuilder, _locale, _translation) {
        var _this = _super.call(this) || this;
        _this._identityService = _identityService;
        _this._router = _router;
        _this._formBuilder = _formBuilder;
        _this._locale = _locale;
        _this._translation = _translation;
        _this.userLanguages = [];
        _this.userLanguages.push({ value: "fr", display: "Français" }, { value: "en", display: "English" });
        return _this;
    }
    CreateUserComponent.prototype.ngOnInit = function () {
        this.buildForm();
        this.revert();
    };
    CreateUserComponent.prototype.buildForm = function () {
        console.log("CreateUser.component: entering buildForm.");
        this.createForm = this._formBuilder.group({
            firstName: ['', [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50)
                ]
            ],
            lastName: ['', [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(500)
                ]
            ],
            password: ['', [
                    Validators.required
                ]
            ],
            confirmPassword: ['', [
                    Validators.required,
                    ValidationHelper.passwordValidator
                ]
            ],
            email: ['', [
                    Validators.required
                ]
            ],
            languageCode: ['', []
            ]
        }, {
            validator: this.passwordValidator
        });
        console.log("Initial form values " + JSON.stringify(this.createForm.value));
    };
    CreateUserComponent.prototype.passwordValidator = function (group) {
        // Confirm password entry.
        var password = group.get('password');
        var confirmPassword = group.get('confirmPassword');
        if ((password == null || password.value === "") || (confirmPassword == null || confirmPassword.value === "")) {
            if (password !== confirmPassword) {
                return { 'customMessage': "Mismatch between password and confirmation password." };
            }
        }
        return null;
    };
    CreateUserComponent.prototype.cancelCreate = function () {
        this.revert();
    };
    CreateUserComponent.prototype.onSubmit = function () {
        console.log("CreateUser.component: entering onSubmit.");
        this.createUserService();
        this.revert();
    };
    // The form is set to pristine state after submit or upon user click.
    CreateUserComponent.prototype.revert = function () {
        this.createForm.reset({
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
            email: "",
            languageCode: ""
        });
    };
    CreateUserComponent.prototype.prepareSaveUser = function () {
        var createFormModel = this.createForm.value;
        console.log(JSON.stringify(createFormModel) + " is valid : " + this.createForm.valid);
        // Deep copy of the changed form model values.
        var saveUser = ({
            firstName: createFormModel.firstName,
            lastName: createFormModel.lastName,
            password: createFormModel.password,
            email: createFormModel.email,
            languageCode: createFormModel.languageCode
        });
        return saveUser;
    };
    CreateUserComponent.prototype.createUserService = function () {
        var _this = this;
        // Extract form data to call API.
        var newUser = this.prepareSaveUser();
        this.sub = this._identityService.createUserAPI(newUser)
            .subscribe(function (data) {
            console.log("User successfully created: " + JSON.stringify(data));
            // rediriger le user apres l'avoir creer
            //this._router.navigateByUrl();
        }, function (error) {
            console.log("Cannot create user: " + newUser.email);
            _this.revert();
        });
    };
    /* Unsubscribe from any subcriptions to flee any leaks to the component */
    CreateUserComponent.prototype.ngOnDestroy = function () {
        if (this.sub != null && typeof (this.sub) != "undefined") {
            this.sub.unsubscribe();
            console.log("CreateUser.component: unsubscribe.");
        }
    };
    CreateUserComponent = __decorate([
        Component({
            selector: 'my-create-user',
            templateUrl: './createuser.component.html',
            styleUrls: ['./createuser.component.css']
        }),
        __metadata("design:paramtypes", [IdentityService, Router, FormBuilder,
            LocaleService, TranslationService])
    ], CreateUserComponent);
    return CreateUserComponent;
}(Translation));
export { CreateUserComponent };
//# sourceMappingURL=createuser.component.js.map