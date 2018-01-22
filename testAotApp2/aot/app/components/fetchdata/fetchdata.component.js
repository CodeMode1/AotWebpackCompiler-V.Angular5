import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
var FetchDataComponent = (function () {
    function FetchDataComponent(http, baseUrl) {
        var _this = this;
        http.get(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(function (result) {
            _this.forecasts = result.json();
        }, function (error) { return console.error(error); });
    }
    FetchDataComponent.decorators = [
        { type: Component, args: [{
                    selector: 'fetchdata',
                    templateUrl: './fetchdata.component.html'
                },] },
    ];
    /** @nocollapse */
    FetchDataComponent.ctorParameters = function () { return [
        { type: Http, },
        { type: undefined, decorators: [{ type: Inject, args: ['BASE_URL',] },] },
    ]; };
    return FetchDataComponent;
}());
export { FetchDataComponent };
//# sourceMappingURL=fetchdata.component.js.map