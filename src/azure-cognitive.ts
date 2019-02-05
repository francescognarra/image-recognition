
import * as request from "request";
import * as request_promised from "request-promise";
import { config } from "../configuration/credentialsAzure";
import { AzureRequestParameters } from "../src/models/azure/azure-models";
import { readImageForAzure } from "./helpers/fileHelpers";
import { IAzureCognitiveServiceResponse } from "./models/azure/azure-output-models";

export class AzureCognitive {
    // tslint:disable-next-line:align
    public async AnalyzeImage(filePath: string, parameters: AzureRequestParameters):
    Promise<IAzureCognitiveServiceResponse> {
        const requestOptions: request.CoreOptions = {
            body: readImageForAzure(__dirname + "/" + filePath),
            headers: {
                "Content-Type": "application/octet-stream",
                "Ocp-Apim-Subscription-Key": config.azureVisionConfig.azureKey1,
            },
        };
        let uri = config.azureVisionConfig.azureEndPoint;
        uri = uri + "/analyze?" + parameters.queryString();
        const response = await request_promised.post(
            uri,
            requestOptions,
        );
        const result: IAzureCognitiveServiceResponse = JSON.parse(response);
        return result;
    }
}
