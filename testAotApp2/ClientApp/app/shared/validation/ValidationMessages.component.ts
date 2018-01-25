import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { ValidationHelper } from './ValidationHelper';

@Component({
    selector: 'validation-messages',
    template: `<div ></div>`
})

// This component makes it easy to report validation error messages for a specific form control.
// Example of the template to add after an HTML input:
//    <validation-messages [control]="createForm.controls.number"></validation-messages>
// TODO: Test with composite forms, i.e. a form within a form --> topForm.subForm.controls.controlName.
export class ValidationMessagesComponent {
    @Input() control: FormControl;

    //get errorMessage() {
    //    for (let validatorName in this.control.errors) {
    //        if (this.control.errors.hasOwnProperty(validatorName) && this.control.touched) {
    //            return ValidationHelper
    //                .getValidatorErrorMessage(this.getControlName(), validatorName, this.control.errors[validatorName]);
    //        }
    //    }

    //    return null;
    //}

    getControlName() {
        var controlName = null;
        var parent = this.control.parent;

        // only such parent, which is FormGroup, has a dictionary 
        // with control-names as a key and a form-control as a value
        if (parent instanceof FormGroup) {
            // now we will iterate those keys (i.e. names of controls)
            Object.keys(parent.controls).forEach((name) => {
                // and compare the passed control and 
                // a child control of a parent - with provided name (we iterate them all)
                if (this.control === parent.controls[name]) {
                    // both are same: control passed to Validator
                    //  and this child - are the same references
                    controlName = name;
                }
            });
        }
        // we either found a name or simply return null
        return controlName;
    }
}