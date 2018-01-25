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
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService } from '../project.service';
import { DocumentService } from '../document.service';
var ProjectEditComponent = /** @class */ (function () {
    function ProjectEditComponent(_activatedRoute, _projectService, _documentService, _router) {
        this._activatedRoute = _activatedRoute;
        this._projectService = _projectService;
        this._documentService = _documentService;
        this._router = _router;
        this.isChildComponent = false;
    }
    ProjectEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.sub = this._activatedRoute.params.subscribe(function (params) {
            if (params.hasOwnProperty('id')) {
                _this.projectId = +params['id'];
                _this._projectService.getProjectAPI(_this.projectId)
                    .subscribe(function (data) {
                    _this.project = data;
                    console.log("Getting project data by id : " + _this.projectId);
                    console.log(_this.project);
                }, function (error) { return console.log("Error getting project data : " + error); });
            }
        });
    };
    ProjectEditComponent.prototype.onRedirectNewDoc = function () {
        console.log("navigate to doc create : ");
        this._router.navigate(['./projects', this.projectId, 'documents', 'create']);
    };
    ProjectEditComponent.prototype.addNewDocument = function (document) {
    };
    ProjectEditComponent.prototype.toggleChildComponent = function () {
        console.log("Toggle child : ");
        this.isChildComponent = !this.isChildComponent;
    };
    ProjectEditComponent.prototype.getCurrentProject = function ($event) {
        this.project = $event;
    };
    ProjectEditComponent.prototype.isToggleChild = function ($event) {
        this.isChildComponent = $event;
    };
    ProjectEditComponent.prototype.ngOnDestroy = function () {
        if (this.sub != null && typeof (this.sub) != 'undefined') {
            console.log("Unsubscribe from ressources.");
            this.sub.unsubscribe();
        }
    };
    ProjectEditComponent = __decorate([
        Component({
            selector: 'project-edit',
            templateUrl: './projectedit.component.html',
            styleUrls: ['./projectedit.component.css']
        }),
        __metadata("design:paramtypes", [ActivatedRoute,
            ProjectService, DocumentService, Router])
    ], ProjectEditComponent);
    return ProjectEditComponent;
}());
export { ProjectEditComponent };
//# sourceMappingURL=projectedit.component.js.map