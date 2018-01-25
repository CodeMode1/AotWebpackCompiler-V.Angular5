var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DocumentService } from '../document.service';
import { Document } from '../document';
import { FormBuilder, Validators } from "@angular/forms";
import { ConfigurationService } from "../../configurations/Configurations.service";
var DocumentEditComponent = /** @class */ (function () {
    function DocumentEditComponent(_activatedRoute, _configurationService, _documentService, _fb, _router, _elRef) {
        this._activatedRoute = _activatedRoute;
        this._configurationService = _configurationService;
        this._documentService = _documentService;
        this._fb = _fb;
        this._router = _router;
        this._elRef = _elRef;
        this.juridictionData = [];
        this.domainData = [];
        this.subDomainData = [];
        this.documentTypeData = [];
        this.documentStructureData = [];
        // Doc to bind the form to.
        this.document = new Document();
        this.filteredSubDomainData = [];
        // Get doc id.
        console.log("parent id : ");
        //console.log(this._activatedRoute.parent.snapshot.params["id"]);
        // Is undefined has document edit doesn't have a parent route in its module. Used before route restructuration. Not used anymore.
        //this.documentId = this._activatedRoute.parent.snapshot.params["id"];
        // Initialization of the form.
        this.buildForm();
        this.revert();
    }
    // Get route id to fetch document by id.
    DocumentEditComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Jurisdiction : Generate dynamically data for the dropdowns.
        this.juridictionData = this._configurationService.getTaxonomy("Jurisdiction");
        // Domain : Generate dynamically data for the dropdowns.
        this.domainData = this._configurationService.getTaxonomy("Domain");
        // NOTE: Just get a sub-domain list, anyone, to avoid null problem until the component is fully initialized.
        this.subDomainData = this._configurationService.getTaxonomy("ContractualProcess");
        // DocumentType : Generate dynamically data for the dropdowns.
        this.documentTypeData = this._configurationService.getTaxonomy("DocumentType");
        // documentStructure : Generate dynamically data for the dropdowns.
        this.documentStructureData = this._configurationService.getTaxonomy("DocumentStructure");
        console.log(this._activatedRoute);
        this.sub = this._activatedRoute.params.subscribe(function (params) {
            if (params.hasOwnProperty('id')) {
                var documentId = +params['id'];
                if (documentId != null && typeof (documentId) != 'undefined' && !isNaN(documentId)) {
                    _this.getDocumentById(documentId);
                }
            }
        });
    };
    /*  FormBuilder creates Top-level form FormGroup. Nested form groups are possible.
        Defining a group of controls in a single object makes for a compact, readable style.
        It beats writing an equivalent series of new FormControl(...) statements */
    DocumentEditComponent.prototype.buildForm = function () {
        console.log("DocumentCreate.component: entering buildForm.");
        /*The top-level form in your component is a FormGroup.
            Nested form groups are possible as Address field: #, street, postal code. */
        this.editForm = this._fb.group({
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
            ],
        }, {});
        console.log("Initial form values " + JSON.stringify(this.editForm.value));
    };
    DocumentEditComponent.prototype.revert = function () {
        this.editForm.reset({
            name: "",
            juridictionId: "",
            domainId: "",
            subDomainId: "",
            documentTypeId: "",
            documentStructureId: ""
        });
    };
    /* Called when the form is submitted. Mapping to class property project */
    DocumentEditComponent.prototype.onSubmit = function () {
        console.log("DocumentEdit.component: entering onSubmit.");
        console.log("In onSubmit");
        this.putDocumentService();
        //this.revert();
        this.setValueForm();
    };
    DocumentEditComponent.prototype.onChangeDomain = function ($event) {
        console.log("should be number : " + $event);
        // SubDomain : Generate dynamically data for the dropdowns.
        //let parentId = +this.editForm.get('domainId').value;
        console.log(this.editForm.get('domainId'));
        //this.subDomainData = this._configurationService.getTaxonomyChildren(parentId);
    };
    // Filtering Sub Domains from completeMethod event object based off domain Data.
    DocumentEditComponent.prototype.searchSubDomain = function ($event) {
        // Clear the filteredSubDomainData array.
        this.filteredSubDomainData = [];
        // Get the appropriate sub
        // $event contains : originalEvent, query.
        console.log("event sub : " + JSON.stringify($event));
        var query = $event.query;
        console.log("query : " + query);
        //var subDomainDataToFilter = this._configurationService.getTaxonomyChildren(+this.editForm.get('domainId').value);
        // Filter from subDomainData data.
        //for (let i = 0; i < subDomainDataToFilter.length; i++) {
        //    let data = subDomainDataToFilter[i];
        //    // Reg ex to test for the full word in the array.
        //    var re = new RegExp('\b' + data["label"] + '\b');
        //    // Check if data["label"] is not in filteredSubDomainData before adding it.
        //    if (this.filteredSubDomainData.indexOf(re) < 0) {
        //        if (data["label"].toLowerCase().indexOf(query.toLowerCase()) == 0) {
        //            this.filteredSubDomainData.push(data["label"]);
        //        }
        //    }
        //}
        // Return the filtered data set.
        return this.filteredSubDomainData;
    };
    DocumentEditComponent.prototype.prepareSaveDocument = function () {
        var editFormModel = this.editForm.value;
        console.log(JSON.stringify(editFormModel) + " is valid : " + this.editForm.valid);
        // Deep copy of the changed form model values. Add the id and projectId property to save doc to project.
        // NOTE: AutoComplete does not handle {value, label} pairs but only the labels themselves.
        //       Thus all the mapping from label to values on save and vice versa on read must be handled by ourselves.
        //       Finally, an array of labels is required by AutoComplete if the multi-select is enabled.
        //       All this plus the filtering could be packaged into a custom component to avoid repetition of tedious code.
        var subDomainLabel = editFormModel.subDomainId[0];
        var subDomainElement = this.subDomainData.filter(function (sdv) { return sdv.label === subDomainLabel; });
        var saveDocument = ({
            id: this.document.id,
            concurrencyStamp: this.document.concurrencyStamp,
            name: editFormModel.name,
            projectId: this.document.projectId,
            juridictionId: editFormModel.juridictionId,
            domainId: editFormModel.domainId,
            subDomainId: subDomainElement[0].value,
            documentTypeId: editFormModel.documentTypeId,
            documentStructureId: editFormModel.documentStructureId
        });
        return saveDocument;
    };
    /* Post a project to the service */
    DocumentEditComponent.prototype.putDocumentService = function () {
        console.log("DocumentEdit.component: entering editDocumentService.");
        var document = this.prepareSaveDocument();
        this.sub = this._documentService.putDocumentAPI(document)
            .subscribe(function (result) {
            // Save data back from service.
            console.log("DocumentEdit.component: success service edit doc @ id : " + JSON.stringify(result));
            document = result;
            console.log("doc editer : " + JSON.stringify(document));
            // Redirect Create
            //this._router.navigate(['/projects', document.projectId, 'documents', 'create']);
        }, function (error) {
            console.log("DocumentEdit.component: error cannot save project : " + error);
        });
    };
    // Call service method to a document corresponding to that id.
    DocumentEditComponent.prototype.getDocumentById = function (id) {
        var _this = this;
        console.log("Getting document by id" + id + " in edi component.");
        this._documentService.getDocumentAPI(id)
            .subscribe(function (data) {
            _this.document = data;
            console.log("document : " + JSON.stringify(_this.document));
            //let parentId = +this.document.domainId;
            //console.log("parent id : " + parentId);
            //console.log(parentId);
            //this.subDomainData = this._configurationService.getTaxonomyChildren(parentId);
            _this.setValueForm();
        }, function (error) { return console.log("Error getting document data : " + error); });
    };
    // TODO: check if edit works on tab (create form tab select options)
    DocumentEditComponent.prototype.setValueForm = function () {
        var _this = this;
        // Set the doc to the form iterating through the dropdown, find one by id (value field). Assign it to the form.
        this.editForm.patchValue({ name: this.document.name });
        this.editForm.patchValue({ juridictionId: this.document.juridictionId });
        this.editForm.patchValue({ domainId: this.document.domainId });
        var subDomainArray = this.subDomainData.filter(function (sdv) { return sdv.value === _this.document.subDomainId; });
        var subDomainLabelArray = [];
        subDomainLabelArray.push(subDomainArray[0].label);
        this.editForm.patchValue({ subDomainId: subDomainLabelArray });
        this.editForm.patchValue({ documentTypeId: this.document.documentTypeId });
        this.editForm.patchValue({ documentStructureId: this.document.documentStructureId });
    };
    DocumentEditComponent.prototype.ngOnDestroy = function () {
        if (this.sub != null && typeof (this.sub) != 'undefined') {
            console.log("Unsubscribe from ressources.");
            this.sub.unsubscribe();
        }
    };
    DocumentEditComponent = __decorate([
        Component({
            selector: 'document-edit',
            templateUrl: './documentedit.component.html'
        }),
        __metadata("design:paramtypes", [ActivatedRoute, ConfigurationService,
            DocumentService, FormBuilder, Router, ElementRef])
    ], DocumentEditComponent);
    return DocumentEditComponent;
}());
export { DocumentEditComponent };
//# sourceMappingURL=documentedit.component.js.map