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
import { DocumentTreeService } from './documenttree.service';
var DocumentContentComponent = /** @class */ (function () {
    function DocumentContentComponent(_documentTreeService) {
        this._documentTreeService = _documentTreeService;
        this._customClasses = {};
        // Initialise test data tree.
        this._treeData = _documentTreeService.getNewNodeWithText('Root node');
        var subNode = _documentTreeService.getNewNodeWithText('node 1');
        this._treeData.subNodes.push(subNode);
        //subNode.subNodes.push(_documentTreeService.getNewNodeWithText('node 1.1'));
        //subNode.subNodes.push(_documentTreeService.getNewNodeWithText('node 1.2'));
        //subNode.subNodes.push(_documentTreeService.getNewNodeWithText('node 1.3'));
        //subNode = _documentTreeService.getNewNodeWithText('node 2');
        //this._treeData.subNodes.push(subNode);
        //subNode.subNodes.push(_documentTreeService.getNewNodeWithText('node 2.1'));
        //subNode.subNodes.push(_documentTreeService.getNewNodeWithText('node 2.2'));
    }
    DocumentContentComponent = __decorate([
        Component({
            selector: 'document-content',
            templateUrl: './documentcontent.component.html',
            styleUrls: ['./documentcontent.component.css']
        }),
        __metadata("design:paramtypes", [DocumentTreeService])
    ], DocumentContentComponent);
    return DocumentContentComponent;
}());
export { DocumentContentComponent };
//# sourceMappingURL=documentcontent.component.js.map