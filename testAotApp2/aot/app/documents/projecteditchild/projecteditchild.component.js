var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Project } from '../project';
import { FormBuilder, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { Router } from '@angular/router';
var ProjectEditChildComponent = /** @class */ (function () {
    function ProjectEditChildComponent(_router, _projectService, _fb) {
        this._router = _router;
        this._projectService = _projectService;
        this._fb = _fb;
        // Create a current project instance emitter.
        this.currentProjectEmitter = new EventEmitter();
        this.isChildEmitter = new EventEmitter();
    }
    ProjectEditChildComponent.prototype.ngOnInit = function () {
    };
    ProjectEditChildComponent.prototype.ngOnChanges = function (changes) {
        if (typeof (changes["parentProject"]) != 'undefined') {
            console.log("In on changes : " + JSON.stringify(this.parentProject));
            // Hard copy of the parent project.
            this.childProject = Object.assign({}, this.parentProject);
            // When inbound properties are set, call building of the form: Initialization of the form.
            this.buildForm();
        }
    };
    /* FormBuilder creates a form group. Which takes key/value pairs of formControls.
        Defining a group of controls in a single object makes for a compact, readable style.
        It beats writing an equivalent series of new FormControl(...) statements.*/
    ProjectEditChildComponent.prototype.buildForm = function () {
        console.log("In buildForm");
        /*The top-level form in your component is a FormGroup.
            Nested form groups are possible as Adress field: #, street, postal code. */
        this.editForm = this._fb.group({
            /* Reactive form controls
            FormControl : will be bound to the appropriate html input.
            Takes 3 optional parameters : data, array validators, array async validators. */
            number: [this.childProject.number,
                Validators.compose([Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(50),
                    // Reg ex pattern: input contains 1+ numbers and 1+ letters.
                    Validators.pattern(/^(?=.+[a-zA-Z])(?=.+\d)(?=.+[a-zA-Z])/)])
            ],
            name: [this.childProject.name,
                Validators.compose([Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(500),
                    Validators.pattern(/^(?=.+[a-zA-Z])(?=.+\d)(?=.+[a-zA-Z])/)]),
            ],
            client: '',
        });
        console.log("Form values " + JSON.stringify(this.editForm.value));
    };
    // Deep copy of the changed form model values to the model.
    ProjectEditChildComponent.prototype.prepareEditProject = function () {
        var editFormModel = this.editForm.value;
        console.log(JSON.stringify(editFormModel) + " is valid : " + this.editForm.valid);
        var editProject = {
            number: editFormModel.number,
            name: editFormModel.name
        };
        editProject.id = this.childProject.id;
        editProject.concurrencyStamp = this.childProject.concurrencyStamp;
        console.log("project to edit : " + editProject);
        return editProject;
    };
    // Submit the form : Call put method.
    ProjectEditChildComponent.prototype.onSubmit = function () {
        // Call prepare submit. (Make deep copies of the form data to save form data without impacting the model).
        console.log("In onSubmit");
        console.log(this.childProject);
        this.childProject = this.prepareEditProject();
        this.putProjectService();
    };
    ProjectEditChildComponent.prototype.cancelEdit = function () {
        // Navigate to parent component.
        this.isChildEmitter.emit(false);
    };
    // Get the id as class property of the project to send for put (controller method).
    ProjectEditChildComponent.prototype.putProjectService = function () {
        var _this = this;
        this.sub = this._projectService.putProjectAPI(this.childProject)
            .subscribe(function (result) {
            console.log("Succes editing project at project id : " + JSON.stringify(result));
            console.log("Attempting to repost parent object through child project data : ");
            _this.childProject = result;
            // Emit the newly modified project to its parent.
            _this.currentProjectEmitter.emit(_this.childProject);
            // Navigate to parent component.
            _this.isChildEmitter.emit(false);
        }, function (error) {
            console.log("Error cant edit project : " + error);
        });
    };
    __decorate([
        Input(),
        __metadata("design:type", Project)
    ], ProjectEditChildComponent.prototype, "parentProject", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ProjectEditChildComponent.prototype, "currentProjectEmitter", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], ProjectEditChildComponent.prototype, "isChildEmitter", void 0);
    ProjectEditChildComponent = __decorate([
        Component({
            selector: 'project-edit-child',
            templateUrl: './projecteditchild.component.html',
            styleUrls: ['./projecteditchild.component.css']
        }),
        __metadata("design:paramtypes", [Router,
            ProjectService,
            FormBuilder])
    ], ProjectEditChildComponent);
    return ProjectEditChildComponent;
}());
export { ProjectEditChildComponent };
//# sourceMappingURL=projecteditchild.component.js.map