"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_promised = require("request-promise");
const credentialsAzure_1 = require("../configuration/credentialsAzure");
const fileHelpers_1 = require("./helpers/fileHelpers");
class AzureCognitive {
    // tslint:disable-next-line:align
    AnalyzeImage(filePath, parameters) {
        return __awaiter(this, void 0, void 0, function* () {
            const requestOptions = {
                body: fileHelpers_1.readImageForAzure(__dirname + "/" + filePath),
                headers: {
                    "Content-Type": "application/octet-stream",
                    "Ocp-Apim-Subscription-Key": credentialsAzure_1.config.azureVisionConfig.azureKey1,
                },
            };
            let uri = credentialsAzure_1.config.azureVisionConfig.azureEndPoint;
            uri = uri + "/analyze?" + parameters.queryString();
            const response = yield request_promised.post(uri, requestOptions);
            const result = JSON.parse(response);
            return result;
        });
    }
}
exports.AzureCognitive = AzureCognitive;
