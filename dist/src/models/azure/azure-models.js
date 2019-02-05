"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const querystring = require("querystring");
class AzureRequestParameters {
    constructor(parameters) {
        this.language = "en";
        this.visualFeatures = [];
        this.details = [];
        Object.assign(this, parameters);
    }
    queryString() {
        return querystring.stringify({
            details: this.details.join(),
            language: this.language,
            visualFeatures: this.visualFeatures.join(),
        });
    }
}
exports.AzureRequestParameters = AzureRequestParameters;
