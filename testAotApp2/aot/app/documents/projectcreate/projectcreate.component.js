var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from "@angular/core";
import { Project } from "../project";
import { FormBuilder, Validators } from "@angular/forms";
import { ProjectService } from "../project.service";
import { Router } from "@angular/router";
import { ValidationHelper } from "../../shared/validation/ValidationHelper";
import { ConfigurationService } from "../../configurations/Configurations.service";
var ProjectCreateComponent = /** @class */ (function () {
    /* Inject the necessary services (configuration & project) here so that this component
          & child components use its methods to query the RESTful Web API.
    */
    function ProjectCreateComponent(_fb, _configurationService, _projectService, _router) {
        this._fb = _fb;
        this._configurationService = _configurationService;
        this._projectService = _projectService;
        this._router = _router;
        console.log("ProjectCreate.component: entering constructor.");
        this.title = "New Project";
        /* Project data model property */
        // Project data model property, used to call the API.
        this.project = new Project();
        // Initialization of the form.
        this.buildForm();
        // Logging events on input fields.
        this.logNameChange();
    }
    ProjectCreateComponent.prototype.ngOnInit = function () {
        console.log("ProjectCreate.component: entering ngOnInit.");
        this.radioControls = this._configurationService.getBooleanList();
    };
    /* valueChanges returns: Observable.
        Emits event when input control value changes (UI or programmatically). */
    ProjectCreateComponent.prototype.logNameChange = function () {
        console.log("ProjectCreate.component: entering logNameChange.");
        var nameControl = this.createForm.get("name");
        nameControl.valueChanges.forEach(function (value) { return console.log("Name control value change: " + value); });
        var numberControl = this.createForm.get("number");
        numberControl.valueChanges.forEach(function (value) { return console.log("Number control value change: " + value); });
        var confidentialConrol = this.createForm.get("confidential");
        confidentialConrol.valueChanges.forEach(function (value) { return console.log("Confidential control value change: " + value); });
    };
    /*  FormBuilder creates Top-level form FormGroup. Nested form groups are possible.
        Defining a group of controls in a single object makes for a compact, readable style.
        It beats writing an equivalent series of new FormControl(...) statements */
    ProjectCreateComponent.prototype.buildForm = function () {
        console.log("ProjectCreate.component: entering buildForm.");
        /*The top-level form in your component is a FormGroup.
            Nested form groups are possible as Address field: #, street, postal code. */
        this.createForm = this._fb.group({
            /* Form Control will bound to html input */
            number: ['', [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50),
                    ValidationHelper.forceLetterAndNumber,
                    this.localValidator
                ]
            ],
            name: ['', [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(500),
                    ValidationHelper.forceLetterAndNumber
                ]
            ],
            client: '',
            confidential: ['', [
                    Validators.required
                ]
            ]
        }, {});
        console.log("Initial form values " + JSON.stringify(this.createForm.value));
    };
    ProjectCreateComponent.prototype.localValidator = function (control) {
        // Just a dummy validator test.
        if (control.value.length === 5) {
            // This demonstrate that an anonymous object with arbitrary property 
            //    can be passed to the error message handler !!
            return { 'localValidator': { value1: "This is value 1", value2: 2 } };
        }
        else {
            return null;
        }
    };
    //groupValidator(group: FormGroup) {
    //    /* Example of a validation that involves several controls */
    //    if ((group.get('number').value.length === 7) && (group.get('name').value.length === 7)) {
    //        /* Pass a custom error message to the validation display component */
    //        return { 'customMessage': "It is not allowed to have bothNumber and Name have exactly 7 characters!" };
    //    } else {
    //        return null;
    //    }
    //}
    // Add pop up -> search page.
    /* Copying data model to the form model use patchValue and set value methods. */
    ProjectCreateComponent.prototype.editForm = function () {
        this.createForm.setValue({
            number: this.project.number,
            name: this.project.name
        });
    };
    // Add pop up -> search page.
    /* The previous hero is cleared and status flags are restored to the pristine state. */
    ProjectCreateComponent.prototype.cancelEditForm = function () {
        this.createForm.reset({
            number: this.project.number,
            name: this.project.name
        });
    };
    // The form is set to pristine state after submit or upon user click.
    ProjectCreateComponent.prototype.revert = function () {
        this.createForm.reset({
            number: "",
            name: "",
            confidential: null
        });
    };
    // Move back to the project list.
    ProjectCreateComponent.prototype.redirectProjects = function () {
        this._router.navigateByUrl("projects");
    };
    /* Called when the form is submitted. Mapping to class property project */
    ProjectCreateComponent.prototype.onSubmit = function () {
        console.log("ProjectCreate.component: entering onSubmit.");
        // Call prepare submit. (Make deep copies of the form data to save form data without impacting the model).
        this.project = this.prepareSaveProject();
        console.log("In onSubmit");
        this.postProjectService();
        this.revert();
    };
    ProjectCreateComponent.prototype.prepareSaveProject = function () {
        var createFormModel = this.createForm.value;
        console.log(JSON.stringify(createFormModel) + " is valid : " + this.createForm.valid);
        // Deep copy of the changed form model values.
        var saveProject = ({
            number: createFormModel.number,
            name: createFormModel.name,
            isConfidential: createFormModel.confidential
        });
        return saveProject;
    };
    /* Post a project to the service */
    ProjectCreateComponent.prototype.postProjectService = function () {
        var _this = this;
        console.log("ProjectCreate.component: entering postProjectService.");
        this.sub = this._projectService.postProjectAPI(this.project)
            .subscribe(function (result) {
            // Save data back from service.
            console.log("ProjectCreate.component: success service saved project @ id : " + JSON.stringify(result));
            _this.project.id = result.id;
            _this.project.number = result.number;
            _this.project.name = result.name;
            _this.project.isConfidential = result.isConfidential;
            _this.project.createdBy = result.createdBy;
            _this.project.createdDate = result.createdDate;
            _this.project.modifiedBy = result.modifiedBy;
            _this.project.modifiedDate = result.modifiedDate;
            _this.project.stateId = result.stateId;
            _this.project.clientId = result.clientId;
            _this.project.documents = result.documents;
            // Redirect automatically to project edit page after successful creation.
            _this._router.navigate(["./projects", _this.project.id]);
        }, function (error) {
            console.log("ProjectCreate.component: error cannot save project : " + error);
        });
    };
    /* Unsubscribe from any subcriptions to flee any leaks to the component */
    ProjectCreateComponent.prototype.ngOnDestroy = function () {
        if (this.sub != null && typeof (this.sub) != "undefined") {
            this.sub.unsubscribe();
            console.log("ProjectCreate.component: unsubscribe.");
        }
    };
    ProjectCreateComponent = __decorate([
        Component({
            selector: "project-create",
            templateUrl: "./projectcreate.component.html",
            styleUrls: ["./projectcreate.component.css"]
        })
        // Visual component to allow a user to create a new project with its mandatory data.
        ,
        __metadata("design:paramtypes", [FormBuilder,
            ConfigurationService, ProjectService,
            Router])
    ], ProjectCreateComponent);
    return ProjectCreateComponent;
}());
export { ProjectCreateComponent };
//# sourceMappingURL=projectcreate.component.js.map