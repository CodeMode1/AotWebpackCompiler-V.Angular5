// implement a class/interface for the document entity so we can post it to the server.
// strongly type a document class to import its type here.
var Document = /** @class */ (function () {
    function Document(id, concurrencyStamp, number, name, docBlockTree, createdBy, createdDate, modifiedBy, modifiedDate, stepId, stateId, projectId, juridictionId, domainId, subDomainId, documentTypeId, documentStructureId, sourceTemplateId, exporteTemplateId, docBlocks) {
        this.id = id;
        this.concurrencyStamp = concurrencyStamp;
        this.number = number;
        this.name = name;
        this.docBlockTree = docBlockTree;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.modifiedBy = modifiedBy;
        this.modifiedDate = modifiedDate;
        this.stepId = stepId;
        this.stateId = stateId;
        this.projectId = projectId;
        this.juridictionId = juridictionId;
        this.domainId = domainId;
        this.subDomainId = subDomainId;
        this.documentTypeId = documentTypeId;
        this.documentStructureId = documentStructureId;
        this.sourceTemplateId = sourceTemplateId;
        this.exporteTemplateId = exporteTemplateId;
        this.docBlocks = docBlocks;
        if (docBlocks == null || docBlocks == undefined) {
            this.docBlocks = [];
        }
        else {
            this.docBlocks = docBlocks;
        }
    }
    return Document;
}());
export { Document };
//# sourceMappingURL=document.js.map