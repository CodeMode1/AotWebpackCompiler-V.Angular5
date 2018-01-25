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
import { FormControl, FormGroup } from '@angular/forms';
var ValidationMessagesComponent = /** @class */ (function () {
    // This component makes it easy to report validation error messages for a specific form control.
    // Example of the template to add after an HTML input:
    //    <validation-messages [control]="createForm.controls.number"></validation-messages>
    // TODO: Test with composite forms, i.e. a form within a form --> topForm.subForm.controls.controlName.
    function ValidationMessagesComponent() {
    }
    //get errorMessage() {
    //    for (let validatorName in this.control.errors) {
    //        if (this.control.errors.hasOwnProperty(validatorName) && this.control.touched) {
    //            return ValidationHelper
    //                .getValidatorErrorMessage(this.getControlName(), validatorName, this.control.errors[validatorName]);
    //        }
    //    }
    //    return null;
    //}
    ValidationMessagesComponent.prototype.getControlName = function () {
        var _this = this;
        var controlName = null;
        var parent = this.control.parent;
        // only such parent, which is FormGroup, has a dictionary 
        // with control-names as a key and a form-control as a value
        if (parent instanceof FormGroup) {
            // now we will iterate those keys (i.e. names of controls)
            Object.keys(parent.controls).forEach(function (name) {
                // and compare the passed control and 
                // a child control of a parent - with provided name (we iterate them all)
                if (_this.control === parent.controls[name]) {
                    // both are same: control passed to Validator
                    //  and this child - are the same references
                    controlName = name;
                }
            });
        }
        // we either found a name or simply return null
        return controlName;
    };
    __decorate([
        Input(),
        __metadata("design:type", FormControl)
    ], ValidationMessagesComponent.prototype, "control", void 0);
    ValidationMessagesComponent = __decorate([
        Component({
            selector: 'validation-messages',
            template: "<div *ngIf=\"errorMessage !== null\" class=\"alert alert-danger\">{{errorMessage}}</div>"
        })
        // This component makes it easy to report validation error messages for a specific form control.
        // Example of the template to add after an HTML input:
        //    <validation-messages [control]="createForm.controls.number"></validation-messages>
        // TODO: Test with composite forms, i.e. a form within a form --> topForm.subForm.controls.controlName.
    ], ValidationMessagesComponent);
    return ValidationMessagesComponent;
}());
export { ValidationMessagesComponent };
//# sourceMappingURL=validationmessages.component.js.map