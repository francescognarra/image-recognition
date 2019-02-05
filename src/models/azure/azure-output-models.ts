export interface ICategory {
    name: string;
    score: number;
}
export interface IImageType {
    clipArtType: number;
    lineDrawingType: number;
}

export interface ITag {
    name: string;
    confidence: number;
}

export interface ICaption {
    text: string;
    confidence: number;
}

export interface IDescription {
    tags: string[];
    captions: ICaption[];
}

export interface IMetadata {
    width: number;
    height: number;
    format: string;
}

export interface IAzureCognitiveServiceResponse {
    categories: ICategory[];
    imageType: IImageType;
    tags: ITag[];
    description: IDescription;
    faces: any[];
    requestId: string;
    metadata: IMetadata;
}
