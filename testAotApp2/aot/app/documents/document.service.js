var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/throw';
import { Injectable } from '@angular/core';
import { IdentityService } from '../identity/user/identity.service';
var DocumentService = /** @class */ (function () {
    function DocumentService(_http, _identityService) {
        this._http = _http;
        this._identityService = _identityService;
        this._apiDocumentUrl = 'api/documents';
    }
    DocumentService.prototype.getHeaders = function () {
        // Add authorization header with jwt token.
        var headers = new Headers({ 'Authorization': 'Bearer ' + this._identityService.token, 'Content-Type': 'application/json' });
        var options = new RequestOptions({ headers: headers });
        return options;
    };
    /* GET: document by id */
    DocumentService.prototype.getDocumentAPI = function (id) {
        var options = this.getHeaders();
        return this._http.get(this._apiDocumentUrl + "/" + id, options)
            .map(function (response) { return response.json(); })
            .catch(function (error) { return error.json(); });
    };
    /* POST: document (view model) */
    DocumentService.prototype.postDocumentAPI = function (document) {
        var options = this.getHeaders();
        var body = JSON.stringify(document);
        return this._http.post(this._apiDocumentUrl, body, options)
            .map(function (response) { return response.json(); })
            .catch(function (error) { return error.json(); });
    };
    DocumentService.prototype.putDocumentAPI = function (document) {
        var options = this.getHeaders();
        var body = JSON.stringify(document);
        return this._http.put(this._apiDocumentUrl, body, options)
            .map(function (response) { return response.json(); })
            .catch(function (error) { return error.json(); });
    };
    /* DELETE: delete document */
    DocumentService.prototype.deleteDocumentByIdAPI = function (id) {
        var options = this.getHeaders();
        return this._http.delete(this._apiDocumentUrl + "/" + id, options)
            .map(function (response) { return console.log("delete document with id : " + id); })
            .catch(function (error) { return console.log("error delete document " + error); });
    };
    DocumentService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, IdentityService])
    ], DocumentService);
    return DocumentService;
}());
export { DocumentService };
//# sourceMappingURL=document.service.js.map