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
import { DocumentTreeService } from './documenttree.service';
var DocBlockComponent = /** @class */ (function () {
    function DocBlockComponent(_documentTreeService) {
        this._documentTreeService = _documentTreeService;
        this.parent = null;
        this.askedChildDeletion = new EventEmitter();
        console.log("DocBlockComponent.constructor.");
        this.expanded = true;
        this._isDisplayDropZone = false;
    }
    DocBlockComponent.prototype.hasChevronDown = function () {
        return this.nodeData.subNodes.length !== 0 && this.expanded;
    };
    DocBlockComponent.prototype.hasChevronRight = function () {
        return this.nodeData.subNodes.length !== 0 && !this.expanded;
    };
    DocBlockComponent.prototype.toggle = function () {
        this.expanded = !this.expanded;
    };
    // TODO Remove this button/event when the tool palette is in place.
    // Add button in the template.
    DocBlockComponent.prototype.addNewNode = function () {
        this.nodeData.subNodes = this.nodeData.subNodes.concat([this._documentTreeService.getNewNode()]);
        this.expanded = true;
    };
    __decorate([
        Input('node-data'),
        __metadata("design:type", Object)
    ], DocBlockComponent.prototype, "nodeData", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], DocBlockComponent.prototype, "parent", void 0);
    __decorate([
        Input('custom-classes'),
        __metadata("design:type", Object)
    ], DocBlockComponent.prototype, "customClasses", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Object)
    ], DocBlockComponent.prototype, "askedChildDeletion", void 0);
    DocBlockComponent = __decorate([
        Component({
            selector: 'doc-block',
            templateUrl: './docblock.component.html',
            styleUrls: ['./docblock.component.css']
        }),
        __metadata("design:paramtypes", [DocumentTreeService])
    ], DocBlockComponent);
    return DocBlockComponent;
}());
export { DocBlockComponent };
//# sourceMappingURL=docblock.component.js.map