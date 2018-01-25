var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
// Singleton service that manages the context for drag-and-drop operations in a Document Content Tree.
// NOTE: Drag-and-drop support in the DOM elements is provided by PrimeNG, this service adds the 
//       component tree management logic and validation business rules.
// 
// There are two possible sources for the drag-and-drop operation:
//    - A type of DocBlock in the tool palette --> this adds a new DocBlock to the document.
//    - A DocBlock already in the document --> this allows reorganizing the document content.
//
// A typical drag-and-drop operations triggers the following events:
//    pDraggable onStartDrag: identifies the source of the operation.
//    pDroppable onDragEnter: as the user moves across potential target elements.
//    pDroppable onDrop     : the user has dropped onto a DocBlock --> insert/move as child.
//    pDroppable onDropAfter: the user has dropped onto a drop zone after the selected DocBlock.
//    pDraggable onDragEnd  : the drag operation is completed --> cleanup time.
var DocumentTreeService = /** @class */ (function () {
    function DocumentTreeService() {
        this.clearState();
    }
    DocumentTreeService.prototype.clearState = function () {
        this._selectedComponent = null;
        this._lastEnteredComponent = null;
    };
    DocumentTreeService.prototype.getSelectedComponent = function () {
        return this._selectedComponent;
    };
    // Prevent dropping a node onto itself or anywhere in its subtree !!
    DocumentTreeService.prototype.isValidTarget = function (docBlockComponent) {
        var currentNode = docBlockComponent;
        while (currentNode != null) {
            if (this._selectedComponent === currentNode) {
                return false;
            }
            currentNode = currentNode.parent;
        }
        return true;
    };
    DocumentTreeService.prototype.clearDropZone = function () {
        if (this._lastEnteredComponent != null) {
            this._lastEnteredComponent._isDisplayDropZone = false;
            this._lastEnteredComponent = null;
        }
    };
    DocumentTreeService.prototype.getNewNode = function () {
        return { text: 'new node', subNodes: [], expanded: false };
    };
    DocumentTreeService.prototype.getNewNodeWithText = function (nodeText) {
        return { text: nodeText, subNodes: [], expanded: true };
    };
    // pDraggable events.
    DocumentTreeService.prototype.onDragStart = function (comp) {
        this._selectedComponent = comp;
        console.log("DocumentTreeService.setSelectedComponent: " + this._selectedComponent.nodeData.text);
    };
    DocumentTreeService.prototype.onDragEnd = function () {
        this.clearDropZone();
        this.clearState();
    };
    // pDroppable events.
    // Keep track of the component currently being the target drop
    //    in order to do drop zone housekeeping.
    DocumentTreeService.prototype.onDragEnter = function (targetComponent) {
        if (this.isValidTarget(targetComponent)) {
            if (this._lastEnteredComponent != null) {
                this._lastEnteredComponent._isDisplayDropZone = false;
            }
            this._lastEnteredComponent = targetComponent;
            targetComponent._isDisplayDropZone = true;
        }
        else {
            this.clearDropZone();
        }
    };
    // Drop the selected component on the target component --> add as child.
    DocumentTreeService.prototype.onDrop = function (targetComponent) {
        if (this.isValidTarget(targetComponent)) {
            var movedNode = this._selectedComponent.nodeData;
            this._selectedComponent.parent.deleteChild(movedNode);
            targetComponent.nodeData.subNodes = targetComponent.nodeData.subNodes.concat([movedNode]);
            this.clearDropZone();
            // Make sure the target component is expanded to see the moved DocBlock.
            targetComponent.expanded = true;
        }
    };
    // Drop the selected component on a drop zone after the component --> add as sibling.
    DocumentTreeService.prototype.onDropAfter = function (targetComponent) {
        if (this.isValidTarget(targetComponent)) {
            // Remove selected at previous location.
            var selectedNode = this._selectedComponent.nodeData;
            this._selectedComponent.parent.deleteChild(selectedNode);
            // Add selected after target.
            var targetParentNodeData = targetComponent.parent.nodeData;
            var addIndex = targetParentNodeData.subNodes.indexOf(targetComponent.nodeData) + 1;
            targetParentNodeData.subNodes.splice(addIndex, 0, selectedNode);
            this.clearDropZone();
        }
    };
    DocumentTreeService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], DocumentTreeService);
    return DocumentTreeService;
}());
export { DocumentTreeService };
//# sourceMappingURL=documenttree.service.js.map