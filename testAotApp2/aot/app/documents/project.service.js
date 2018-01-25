var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Injectable } from '@angular/core';
import { IdentityService } from '../identity/user/identity.service';
var ProjectService = /** @class */ (function () {
    function ProjectService(_http, _identityService) {
        this._http = _http;
        this._identityService = _identityService;
        this._apiUrl = 'api/projects';
    }
    ProjectService.prototype.getHeaders = function () {
        // Add authorization header with jwt token.
        var headers = new Headers({ 'Authorization': 'Bearer ' + this._identityService.token, 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        return options;
    };
    /* GET: all projects objects */
    //getProjectsAPI(): Observable<IProject[]> {
    //    let options = this.getHeaders();
    //    let searchParams = new URLSearchParams();
    //    searchParams.append('view', 'detail');
    //    options.search = searchParams;
    //    return this._http.get(this._apiUrl, options)
    //        .map((response: Response) => <IProject[]>response.json())
    //        .catch((error: any) => <any>error.json())
    //}
    /* GET: get project by id */
    ProjectService.prototype.getProjectAPI = function (id) {
        var options = this.getHeaders();
        var searchParams = new URLSearchParams();
        searchParams.append('view', 'detail');
        options.search = searchParams;
        return this._http.get(this._apiUrl + "/" + id, options)
            .map(function (response) { return response.json(); })
            .catch(function (error) { return error.json(); });
    };
    /* GET: get projects by simple search */
    //getProjectSearchAPI(number?: string, name?: string, searchCreatedDateFromParam?: Date, searchCreatedDateToParam?: Date, searchModifiedDateFromParam?: Date, searchModifiedDateToParam?: Date): Observable<IProject[]> {
    //    let options = this.getHeaders();
    //    let searchParams = new URLSearchParams();
    //    searchParams.append('view', 'detail');
    //    if (number != null && typeof (number) != 'undefined' && number.length > 0) {         
    //        searchParams.append('number', number);
    //    }
    //    if (name != null && typeof (name) != 'undefined' && name.length > 0) {
    //        searchParams.append('name', name);
    //    }
    //    if (searchCreatedDateFromParam != null && typeof (searchCreatedDateFromParam) != 'undefined') {
    //        var createdDateFromUtc = searchCreatedDateFromParam.toUTCString();
    //        searchParams.append('createdDateFromUtc', createdDateFromUtc);
    //    }
    //    if (searchCreatedDateToParam != null && typeof (searchCreatedDateToParam) != 'undefined') {
    //        var createdDateToUtc = searchCreatedDateToParam.toUTCString();
    //        searchParams.append('createdDateToUtc', createdDateToUtc);
    //    }
    //    if (searchModifiedDateFromParam != null && typeof (searchModifiedDateFromParam) != 'undefined') {
    //        var modifiedDateFromToUtc = searchModifiedDateFromParam.toUTCString();
    //        searchParams.append('modifiedDateFromToUtc', modifiedDateFromToUtc);
    //    }
    //    if (searchModifiedDateToParam != null && typeof (searchModifiedDateToParam) != 'undefined') {
    //        var modifiedDateToUtc = searchModifiedDateToParam.toUTCString();
    //        searchParams.append('modifiedDateToUtc', modifiedDateToUtc);
    //    }
    //    options.search = searchParams;
    //    return this._http.get(this._apiUrl, options)
    //        .map((response: Response) => <IProject[]>response.json())
    //        .catch((error: any) => <any>error.json())
    //}
    /* POST: post project */
    ProjectService.prototype.postProjectAPI = function (project) {
        var options = this.getHeaders();
        var body = JSON.stringify(project);
        return this._http.post(this._apiUrl, body, options)
            .map(function (response) { return response.json(); })
            .catch(function (error) { return error.json(); });
    };
    /* PUT: update object */
    ProjectService.prototype.putProjectAPI = function (project) {
        var options = this.getHeaders();
        var body = JSON.stringify(project);
        return this._http.put(this._apiUrl, body, options)
            .map(function (response) { return response.json(); })
            .catch(function (error) { return error.json(); });
    };
    /* DELETE: delete project */
    ProjectService.prototype.deleteProjectByIdAPI = function (id) {
        var options = this.getHeaders();
        return this._http.delete(this._apiUrl + "/" + id, options)
            .map(function (response) { return console.log("delete project with id : " + id); })
            .catch(function (error) { return console.log("error delete project " + error); });
    };
    ProjectService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, IdentityService])
    ], ProjectService);
    return ProjectService;
}());
export { ProjectService };
//# sourceMappingURL=project.service.js.map