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
import { Project } from '../project';
import { ProjectService } from '../project.service';
import { Router, ActivatedRoute } from '@angular/router';
import { IdentityService } from '../../identity/user/identity.service';
import { Confirmation } from '../../shared/confirmdialog/confirmation';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/throttleTime';
import { Observable } from 'rxjs/Observable';
//import * as $ from "jquery";
// TODO Try with Subject instead to see if could do without this extra library.
//var Rx = require('rx'),
//    EventEmitter = require('events').EventEmitter;
// For toaster display when can't edit or delete.
import { NotificationsService } from 'angular2-notifications';
import { Localization, LocaleService, TranslationService } from 'angular-l10n';
import { ConfirmDialogService } from '../../shared/confirmdialog/confirmdialog.service';
var ProjectSearchComponent = /** @class */ (function (_super) {
    __extends(ProjectSearchComponent, _super);
    /* Inject the service project service here so that this component & child components use its methods
        to query the RESTful Web API.
    */
    function ProjectSearchComponent(_projectService, _router, _activatedRoute, _identityService, _notificationsService, _locale, _translation, _confirmDialogService) {
        var _this = _super.call(this) || this;
        _this._projectService = _projectService;
        _this._router = _router;
        _this._activatedRoute = _activatedRoute;
        _this._identityService = _identityService;
        _this._notificationsService = _notificationsService;
        _this._locale = _locale;
        _this._translation = _translation;
        _this._confirmDialogService = _confirmDialogService;
        // Contains the list of all projects that currently satisfy search criteria.
        _this.projectData = [];
        // Currently selected project, is a clone of the item in projectData above,
        //   and is the property being edited in the project popup edit dialog box.
        _this.currentProject = new Project();
        // Contains the current search criteria.
        //this.searchProject = new Project();
        _this.disabledDates = new Array();
        _this.toggleForm = false;
        _this.radioControls = [];
        _this.radioControls.push({ value: false, display: 'Non', id: 0 }, { value: true, display: 'Oui', id: 1 });
        _this.modeSoumission = false;
        // Advanced Search à false au départ (champ num + titre).
        _this.advancedSearch = false;
        _this.checkBoxSearch = false;
        _this.canUserEdit = false;
        _this.canUserDelete = false;
        // Duration: 6000 milliseconds.
        _this.duration = 6000;
        // Create the mouse over event emitter.
        //this.mouseOverEventEmitter = new EventEmitter();
        // PaginatorObject to bind to in the paginator widget template.
        _this.paginatorObject = { total_projs: 0, per_page: 2, total_pages: 0, current_page: 0 };
        /*
            (Observable): An observable sequence generated from the named event from the given EventEmitter.
        */
        // throttleTime : Emits a value from the source Observable, then ignores subsequent source values for duration milliseconds, then repeats this process.
        _this.obSubscription = Observable.fromEvent(_this.mouseOverEventEmitter, 'mouseover')
            .throttleTime(_this.duration)
            .subscribe(function (next) {
            console.log("onNext: " + next);
            _this.toastUser();
        }, function (error) {
            console.log("onError: " + error);
        }, function () {
            console.log("Completed. Disposing of observable.");
        });
        return _this;
        // How to fire mouse event once for moving over child elements in Javascript ?
        // What you really need is the mouseenter event, which does not bubble (unlike mouseover).
        /*
            The synchronous mouseenter DOM event is dispatched when a mouse or another pointing device enters the physical space given to the element or one of its descendants.
            Similar to mouseover , it differs in that it doesn't bubble and that it isn't sent when the pointer is moved from one of its descendants' physical space to its own physical space.
        */
    }
    // Effectuate initialization of the component here : 
    ProjectSearchComponent.prototype.ngOnInit = function () {
        // An object having regional configuration properties for the calendar.
        // Array from fichier traduction Array.from(this)
        var dayNames = JSON.parse(this._translation.translate("day_names"));
        var dayNamesShort = JSON.parse(this._translation.translate("day_names_short"));
        var dayNamesMin = JSON.parse(this._translation.translate("day_names_min"));
        var monthNames = JSON.parse(this._translation.translate("month_names"));
        var monthNamesShort = JSON.parse(this._translation.translate("month_names_short"));
        this.localeCalendar = {
            firstDayOfWeek: 0,
            dayNames: dayNames,
            dayNamesShort: dayNamesShort,
            dayNamesMin: dayNamesMin,
            monthNames: monthNames,
            monthNamesShort: monthNamesShort
        };
        if (this._identityService.userHasPermission("perm_project_edit")) {
            this.canUserEdit = true;
            console.log("User has permission : " + this.canUserEdit + " to edit project.");
        }
        else {
            console.log("User has not permission : " + this.canUserEdit + " to edit project.");
        }
        if (this._identityService.userHasPermission("perm_project_delete")) {
            this.canUserDelete = true;
            console.log("User has permission : " + this.canUserEdit + " to edit project.");
        }
        else {
            console.log("User has not permission : " + this.canUserDelete + " to delete project.");
        }
        //this.getProjectsService();
    };
    // Interface hook on AfterViewInit.
    ProjectSearchComponent.prototype.ngAfterViewInit = function () {
        console.log("in ngAfterViewInit, calling project service.");
    };
    ProjectSearchComponent.prototype.paginate = function ($event) {
        console.log($event);
        console.log("Index of first record : " + $event.first);
        console.log("Number of rows to display in new page : " + $event.rows);
        console.log("New page number : " + $event.page);
        console.log("Total number of pages : " + $event.pageCount);
        this.paginatorObject.current_page = $event.page;
        this.paginatorObject.per_page = $event.rows;
        // ProjectData to return on every click of the widget’s arrows. Skip the first elements.
        var toSlice = (($event.page) * $event.rows);
        if (toSlice < 0) {
            toSlice = 0;
        }
        var endSlice = toSlice + this.paginatorObject.per_page;
        this.projectData = this.cacheData.slice(toSlice, endSlice);
        console.log(this.projectData);
    };
    /*
        UI trigger toast with mouseover method.
        Also, another alternative is : FromEventPattern. source: https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/events.md
            Source #2: https://xgrommx.github.io/rx-book/content/rxjs_bindings/node/event_handlers/from_event.html
    */
    ProjectSearchComponent.prototype.confirmDelete = function (project) {
        var _this = this;
        /* options:
                header: Header text of the dialog.
                icon: Icon to display next to the message.
                message: Message of the confirmation.
                key: Optional key to match the key of the confirm dialog, necessary to use when component tree has multiple confirm dialogs.
                accept: Callback to execute when action is confirmed.
                reject: Callback to execute when action is rejected.
        */
        var header = 'Confirm Suppression';
        var icon = 'fa fa-question-circle';
        var message = "Are you sure that you want to delete project " + project.name + " ?";
        var accept = function () {
            //Callback to execute when action is accepted.
            console.log("confirmDelete accepted.");
            _this.currentProject = project;
            _this.deleteProject();
        };
        var reject = function () {
            //Callback to execute when action is rejected.
            console.log("confirmDelete rejected. deleteProject escaped.");
        };
        var acceptLabel = 'Oui';
        var rejectLabel = 'Non';
        var width = 600;
        var confirmation = new Confirmation(message, undefined, icon, header, accept, reject, acceptLabel, rejectLabel, width);
        // Pass a confirmaiton object to the service so it can set the dialog properties.
        this._confirmDialogService.displayConfirmDialog(confirmation);
    };
    ProjectSearchComponent.prototype.triggerToast = function () {
        console.log("In triggerToast enter : ");
        if (!this.canUserDelete || !this.canUserEdit) {
            console.log("In triggerToast if user can't edit or delete : ");
            this.mouseOverEventEmitter.emit('mouseover');
        }
    };
    // Event binding on the created event of the toast.
    ProjectSearchComponent.prototype.created = function ($event) {
        console.log($event);
    };
    // Event binding on the destroyed event of the toast.
    ProjectSearchComponent.prototype.destroyed = function ($event) {
        console.log($event);
    };
    // If the user doesn't have the permission we display a toast.
    ProjectSearchComponent.prototype.toastUser = function () {
        if (!this.canUserEdit || !this.canUserDelete) {
            return this._identityService.showToast("permissions");
        }
        return true;
    };
    // Change sur le model du radio (value qui est select).
    ProjectSearchComponent.prototype.clickRadio = function (radio) {
        console.log(radio.value);
        console.log(radio.id);
        console.log(radio.display);
        this.currentProject.isConfidential = radio.value;
    };
    // Clone the selected project into a separate currentProject instance
    //   that will be used for editing should the user open the project edit popup dialog box.
    ProjectSearchComponent.prototype.onSelectProject = function (selectedProject) {
        this.currentProject = Object.assign({}, selectedProject);
    };
    // Absolute redirection to edit project page.
    ProjectSearchComponent.prototype.redirectEditProject = function (id) {
        console.log("redirect project by id + " + id);
        this._router.navigate(['./projects', id]);
    };
    // Absolute redirection to edit document page.
    ProjectSearchComponent.prototype.redirectEditDocument = function (id) {
        console.log("redirect document by id" + id);
        this._router.navigate(["./documents", id]);
    };
    // Absolute redirection to create project page.
    ProjectSearchComponent.prototype.redirectCreateProject = function () {
        this._router.navigateByUrl("/projects/create");
    };
    // Toggle switch pour montrer plus d'input fields.
    ProjectSearchComponent.prototype.onAdvancedSearch = function () {
        this.advancedSearch = !this.advancedSearch;
        this.checkBoxSearch = !this.checkBoxSearch;
    };
    // Simple / Advanced search depending mode advancedSearch
    ProjectSearchComponent.prototype.searchProjectFields = function () {
        console.log("searchProjectFields");
        if (this.advancedSearch) {
            this.searchProjectAdvancedAPI();
        }
        else {
            //this.searchProjectSimpleAPI(); 
        }
    };
    // Simple search
    //searchProjectSimpleAPI(): void {
    //    console.log("Trying to search simple fields");
    //    this._projectService.getProjectSearchAPI(this.number, this.name)
    //        .subscribe(
    //            result => {
    //                console.log("Getting projects by Simple Search from service : " + JSON.stringify(result));
    //                this.cacheData = result as Project[];
    //                this.InitializePaginator();
    //            },
    //            error => {
    //                console.log("Error get projects from service : " + error);
    //            }
    //        );
    //}
    // Clear search inputs
    ProjectSearchComponent.prototype.clearSearchFields = function () {
        //this.number = null;
        //this.name = null;
        //this.searchCreatedDateFrom = null;
        //this.searchCreatedDateTo = null;
        //this.searchModifiedDateFrom = null;
        //this.searchModifiedDateTo = null;
    };
    // Advanced search
    ProjectSearchComponent.prototype.searchProjectAdvancedAPI = function () {
        console.log("Trying to search advanced fields");
        var searchCreatedDateFromParam = null;
        var searchCreatedDateToParam = null;
        var searchModifiedDateFromParam = null;
        var searchModifiedDateToParam = null;
        if ((typeof (this.searchCreatedDateFrom) != "undefined") && (this.searchCreatedDateFrom != null)) {
            // Set the param created date to search server side.
            searchCreatedDateFromParam = this.searchCreatedDateFrom;
        }
        if ((typeof (this.searchCreatedDateTo) != "undefined") && (this.searchCreatedDateTo != null)) {
            // Old way handling dates -> moment js date object : date internally, string format date.
            searchCreatedDateToParam = this.searchCreatedDateTo;
        }
        if ((typeof (this.searchModifiedDateFrom) != "undefined") && (this.searchModifiedDateFrom != null)) {
            // Set the param created date to search server side.
            searchModifiedDateFromParam = this.searchModifiedDateFrom;
        }
        if ((typeof (this.searchModifiedDateTo) != "undefined") && (this.searchModifiedDateTo != null)) {
            // Set the param created date to search server side.
            searchModifiedDateToParam = this.searchModifiedDateTo;
        }
        // Faire un object new Date ts a partir fields, car type retour Date Input est string.
        //this._projectService.getProjectSearchAPI(this.number, this.name,
        //    searchCreatedDateFromParam, searchCreatedDateToParam, searchModifiedDateFromParam, searchModifiedDateToParam)
        //    .subscribe(
        //        result => {
        //            console.log("Getting projects by Advanced Search from service : " + JSON.stringify(result));
        //            this.cacheData = result as Project[];
        //            this.InitializePaginator();
        //        },
        //        error => {
        //            console.log("Error get projects from service : " + error);
        //        }
        //    );
    };
    // Display projects Bd.
    ProjectSearchComponent.prototype.searchProjects = function () {
        console.log("Get all projects");
        this.clearSearchFields();
        //this.getProjectsService();
    };
    // Delete button event -> project delete service. 
    ProjectSearchComponent.prototype.deleteProject = function () {
        if (this.currentProject != null) {
            console.log("Calling Delete Project by id " + this.currentProject.id + " Service succeeded.");
            //this.deleteProjectService(this.currentProject.id);
        }
        else {
            //console.log(`Calling Delete Project by id ${this.currentProject.id} Service failed.`);
        }
    };
    // Edit BUTTON event --> project put service. 
    ProjectSearchComponent.prototype.editProject = function (project) {
        this.putProjectService();
    };
    /* TODO: Get project by num + name: simple search.
        get project by seized fields : detailed search.
    */
    ProjectSearchComponent.prototype.searchProjectId = function () {
        console.log("Get project by Numero + name");
    };
    /* Get Projects from the service here :
        Subscribing to an observable creates the observable thus the fetch of the data.
    */
    //getProjectsService(): void {
    //    this.sub = this._projectService.getProjectsAPI()
    //        .subscribe(
    //            result => {
    //                    console.log("Getting projects from service : " + JSON.stringify(result));
    //                    this.cacheData = result as Project[];
    //                    this.InitializePaginator();
    //            },
    //            error => {
    //                console.log("Error get projects from service : " + error);
    //            }
    //        );
    //}
    ProjectSearchComponent.prototype.InitializePaginator = function () {
        this.paginatorObject.total_projs = this.cacheData.length;
        this.paginatorObject.total_pages = Math.min(Math.ceil(this.paginatorObject.total_projs / this.paginatorObject.per_page), 10);
        this.paginatorObject.per_page = 2;
        // Validate current page : set page 0.
        this.paginatorObject.current_page = 0;
        this.paginate({
            first: 0,
            rows: this.paginatorObject.per_page,
            page: this.paginatorObject.current_page,
            pageCount: this.paginatorObject.total_pages
        });
    };
    // TODO: This is apparently not being used for the moment.
    ProjectSearchComponent.prototype.getProjectByIdService = function (id) {
        var _this = this;
        this.sub = this._projectService.getProjectAPI(id)
            .subscribe(function (result) {
            console.log("Get projects from service by id : " + id + JSON.stringify(result));
            // Assign the project to the newly fetched project.
            _this.currentProject = result;
        }, function (error) {
            console.log("Error get projects from service : " + error);
        });
    };
    ProjectSearchComponent.prototype.putProjectService = function () {
        var _this = this;
        this.sub = this._projectService.putProjectAPI(this.currentProject)
            .subscribe(function (result) {
            console.log("Calling Edit Project Service succeeded." + JSON.stringify(result));
            // Update the currently selected project in case it is edited again.
            _this.currentProject = result;
            // Update item in the list to updated values, 
            //     create a clone so the list does not refer to the currentProject.
            var updatedProject = Object.assign({}, _this.currentProject);
            var index = _this.projectData.findIndex(function (p) { return p.id === _this.currentProject.id; });
            _this.projectData[index] = updatedProject;
        }, function (error) {
            console.log("Error cant edit project : " + error);
        });
    };
    ProjectSearchComponent.prototype.deleteProjectService = function (id) {
        var _this = this;
        this.sub = this._projectService.deleteProjectByIdAPI(id)
            .subscribe(function (result) {
            var index = _this.projectData.findIndex(function (p) { return p.id === id; });
            // Delete client side update view.
            _this.projectData.splice(index, 1);
            _this.currentProject = new Project();
            console.log("Succes result service deleting a project");
        }, function (error) {
            console.log("Error service deleting project : " + error);
        });
    };
    // Unsubscribe from any subcriptions to flee any leaks to the component.
    ProjectSearchComponent.prototype.ngOnDestroy = function () {
        console.log("ProjectSearch.component.ngOnDestroi");
        if (this.sub != null && typeof (this.sub) != 'undefined') {
            this.sub.unsubscribe();
        }
        if (this.obSubscription != null && typeof (this.obSubscription) != 'undefined') {
            this.obSubscription.unsubscribe();
        }
    };
    ProjectSearchComponent = __decorate([
        Component({
            selector: 'project-search',
            templateUrl: './projectsearch.component.html',
            styleUrls: ['./projectsearch.component.css']
        }),
        __metadata("design:paramtypes", [ProjectService,
            Router,
            ActivatedRoute,
            IdentityService,
            NotificationsService,
            LocaleService,
            TranslationService,
            ConfirmDialogService])
    ], ProjectSearchComponent);
    return ProjectSearchComponent;
}(Localization));
export { ProjectSearchComponent };
//# sourceMappingURL=projectsearch.component.js.map