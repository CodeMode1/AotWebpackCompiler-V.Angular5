// implement a class/interface for the project entity so we can post it to the server.
// strongly type a document class to import its type here.
var Project = /** @class */ (function () {
    function Project(id, concurrencyStamp, number, name, isConfidential, createdBy, createdDate, modifiedBy, modifiedDate, stateId, clientId, documents) {
        this.id = id;
        this.concurrencyStamp = concurrencyStamp;
        this.number = number;
        this.name = name;
        this.isConfidential = isConfidential;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.modifiedBy = modifiedBy;
        this.modifiedDate = modifiedDate;
        this.stateId = stateId;
        this.clientId = clientId;
        this.documents = documents;
        if (documents == null || documents == undefined) {
            this.documents = [];
        }
        else {
            this.documents = documents;
        }
    }
    return Project;
}());
export { Project };
//# sourceMappingURL=project.js.map