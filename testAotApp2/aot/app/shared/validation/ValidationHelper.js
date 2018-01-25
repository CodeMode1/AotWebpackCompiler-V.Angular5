// Provide a validation message for each type of validation.
//   controlName: The name of the FormControl that issued the error.
//   validatorName: The type of validation that caused the error.
//   validatorValue: The validator value (e.g. threshold) that was not respected.
// TODO: Convert / translate control name into French / English names to display the error.
// TODO: Translate error messages in French / English.
var ValidationHelper = /** @class */ (function () {
    function ValidationHelper() {
    }
    ValidationHelper.getValidatorErrorMessage = function (controlName, validatorName, validatorValue) {
        var errorMessage = '';
        switch (validatorName) {
            case 'required':
                errorMessage = controlName + " is required.";
                break;
            case 'minlength':
                errorMessage = controlName + " must be at least " + validatorValue.requiredLength + " characters long.";
                break;
            case 'maxlength':
                errorMessage = controlName + " cannot be more than " + validatorValue.requiredLength + " characters long.";
                break;
            case 'pattern':
                errorMessage = controlName + " does not respect the desired pattern " + validatorValue.requiredPattern + ".";
                break;
            case 'invalidCreditCard':
                errorMessage = controlName + " is not a valid credit card number.";
                break;
            case 'invalidEmailAddress':
                errorMessage = controlName + " is not a valid email address.";
                break;
            case 'invalidPassword':
                errorMessage = controlName + " is not a valid password. Password must be at least 6 characters long, and contain a number.";
                break;
            case 'forceLetterAndNumber':
                errorMessage = controlName + " must contain at least one character and one number.";
                break;
            case 'localValidator':
                errorMessage = controlName + " is exactly 5 characters!! Yahooo!";
                break;
            case 'customMessage':
                errorMessage = validatorValue;
                break;
        }
        ;
        return errorMessage;
    };
    ValidationHelper.forceLetterAndNumber = function (control) {
        // Reg ex pattern: input contains 1+ numbers and 1+ letters.
        if (control.value.match(/^(?=.+[a-zA-Z])(?=.+\d)(?=.+[a-zA-Z])/)) {
            return null;
        }
        else {
            return { 'forceLetterAndNumber': true };
        }
    };
    ValidationHelper.creditCardValidator = function (control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
            return null;
        }
        else {
            return { 'invalidCreditCard': true };
        }
    };
    ValidationHelper.emailValidator = function (control) {
        // RFC 2822 compliant regex
        if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
            return null;
        }
        else {
            return { 'invalidEmailAddress': true };
        }
    };
    ValidationHelper.passwordValidator = function (control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
            return null;
        }
        else {
            return { 'invalidPassword': true };
        }
    };
    return ValidationHelper;
}());
export { ValidationHelper };
//# sourceMappingURL=ValidationHelper.js.map