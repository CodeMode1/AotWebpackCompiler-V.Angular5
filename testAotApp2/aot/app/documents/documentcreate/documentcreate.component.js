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
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentService } from '../document.service';
import { FormBuilder, Validators } from "@angular/forms";
import { ConfigurationService } from "../../configurations/Configurations.service";
var DocumentCreateComponent = /** @class */ (function () {
    function DocumentCreateComponent(_fb, _configurationService, _documentService, _router, _activatedRoute) {
        this._fb = _fb;
        this._configurationService = _configurationService;
        this._documentService = _documentService;
        this._router = _router;
        this._activatedRoute = _activatedRoute;
        console.log("create component");
        this.juridictionData = [];
        this.domainData = [];
        this.subDomainData = [];
        this.documentTypeData = [];
        this.documentStructureData = [];
        // Getting project id to save doc at :/id
        console.log("parent id");
        //console.log(this._activatedRoute.parent.snapshot.params["id"]);
        //this.projectId = this._activatedRoute.parent.snapshot.params["id"];
        // Initialization of the form.
        this.buildForm();
        this.revert();
    }
    DocumentCreateComponent.prototype.ngOnInit = function () {
        console.log("DocumentCreate.component: entering ngOnInit.");
        // Jurisdiction : Generate dynamically data for the dropdowns.
        this.juridictionData = this._configurationService.getTaxonomy("Jurisdiction");
        // Domain : Generate dynamically data for the dropdowns.
        this.domainData = this._configurationService.getTaxonomy("Domain");
        // DocumentType : Generate dynamically data for the dropdowns.
        this.documentTypeData = this._configurationService.getTaxonomy("DocumentType");
        // documentStructure : Generate dynamically data for the dropdowns.
        this.documentStructureData = this._configurationService.getTaxonomy("DocumentStructure");
    };
    DocumentCreateComponent.prototype.onRedirectEdit = function () {
        this._router.navigate(['./projects', this.projectId, 'documents', 'edit']);
    };
    //onChangeDomain($event) {
    //    console.log($event);
    //    // SubDomain : Generate dynamically data for the dropdowns.
    //    //let parentId = +this.createForm.get('domainId').value;
    //    console.log(this.createForm.get('domainId'));
    //    this.subDomainData = this._configurationService.getTaxonomyChildren(parentId);
    //}
    DocumentCreateComponent.prototype.revert = function () {
        this.createForm.reset({
            name: "",
            juridictionId: "",
            domainId: "",
            subDomainId: "",
            documentTypeId: "",
            documentStructureId: ""
        });
    };
    /*  FormBuilder creates Top-level form FormGroup. Nested form groups are possible.
        Defining a group of controls in a single object makes for a compact, readable style.
        It beats writing an equivalent series of new FormControl(...) statements */
    DocumentCreateComponent.prototype.buildForm = function () {
        console.log("DocumentCreate.component: entering buildForm.");
        /*The top-level form in your component is a FormGroup.
            Nested form groups are possible as Address field: #, street, postal code. */
        this.createForm = this._fb.group({
            /* Form Control will bound to html input */
            name: ['', [
                    Validators.required,
                    Validators.minLength(3),
                    Validators.maxLength(500)
                ]
            ],
            juridictionId: ['', [
                    Validators.required
                ]
            ],
            domainId: ['', [
                    Validators.required
                ]
            ],
            subDomainId: ['', [
                    Validators.required
                ]
            ],
            documentTypeId: ['', [
                    Validators.required
                ]
            ],
            documentStructureId: ['', [
                    Validators.required
                ]
            ]
        }, {});
        console.log("Initial form values " + JSON.stringify(this.createForm.value));
    };
    /* Called when the form is submitted. Mapping to class property project */
    DocumentCreateComponent.prototype.onSubmit = function () {
        console.log("DocumentCreate.component: entering onSubmit.");
        console.log("In onSubmit");
        this.postDocumentService();
        this.revert();
    };
    DocumentCreateComponent.prototype.prepareSaveDocument = function () {
        var createFormModel = this.createForm.value;
        console.log(JSON.stringify(createFormModel) + " is valid : " + this.createForm.valid);
        // Deep copy of the changed form model values.
        var saveProject = ({
            name: createFormModel.name,
            projectId: this.projectId,
            juridictionId: createFormModel.juridictionId,
            domainId: createFormModel.domainId,
            subDomainId: createFormModel.subDomainId,
            documentTypeId: createFormModel.documentTypeId,
            documentStructureId: createFormModel.documentStructureId
        });
        return saveProject;
    };
    /* Post a project to the service */
    DocumentCreateComponent.prototype.postDocumentService = function () {
        var _this = this;
        console.log("DocumentCreate.component: entering postDocumentService.");
        var document = this.prepareSaveDocument();
        this.sub = this._documentService.postDocumentAPI(document)
            .subscribe(function (result) {
            // Save data back from service.
            console.log("DocumentCreate.component: success service saved project @ id : " + JSON.stringify(result));
            document = result;
            console.log(document.id);
            // Redirect Edit
            _this._router.navigate(['./projects', _this.projectId, 'documents', document.id, 'edit']);
        }, function (error) {
            console.log("DocumentCreate.component: error cannot save project : " + error);
        });
    };
    DocumentCreateComponent.prototype.ngOnDestroy = function () {
        console.log("DocumentCreate.component: entering ngOnInit.");
    };
    DocumentCreateComponent = __decorate([
        Component({
            selector: 'create-document',
            templateUrl: './documentcreate.component.html'
        }),
        __metadata("design:paramtypes", [FormBuilder,
            ConfigurationService, DocumentService,
            Router, ActivatedRoute])
    ], DocumentCreateComponent);
    return DocumentCreateComponent;
}());
export { DocumentCreateComponent };
//# sourceMappingURL=documentcreate.component.js.map