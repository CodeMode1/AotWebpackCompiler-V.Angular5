import { Component } from '@angular/core';
var CounterComponent = /** @class */ (function () {
    function CounterComponent() {
        this.currentCount = 0;
    }
    CounterComponent.prototype.incrementCounter = function () {
        this.currentCount++;
    };
    CounterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'counter',
                    templateUrl: './counter.component.html'
                },] },
    ];
    /** @nocollapse */
    CounterComponent.ctorParameters = function () { return []; };
    return CounterComponent;
}());
export { CounterComponent };
//# sourceMappingURL=counter.component.js.map