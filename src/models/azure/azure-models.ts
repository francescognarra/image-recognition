import * as querystring from "querystring";

export type VisualFeature = "Categories" | "Tags" | "Description" | "Faces" | "ImageType" | "Color" | "Adult";
export type Detail = "celebrities" | "landmarks";

export interface IAzureRequestParameters {
    language?: string;
    visualFeatures?: VisualFeature[];
    details?: Detail[];
    queryString?: string;
}

export class AzureRequestParameters {
    public language?: "en" | "zh" = "en";
    public visualFeatures?: VisualFeature[] = [];
    public details?: Detail[] = [];

    constructor(parameters: AzureRequestParameters) {
        Object.assign(this, parameters);
    }

    public queryString?() {
        return querystring.stringify({
            details: this.details.join(),
            language: this.language,
            visualFeatures: this.visualFeatures.join(),
        });
    }
}
