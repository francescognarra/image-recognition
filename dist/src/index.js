"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const aws_rekognition_1 = require("./aws-rekognition");
const azure_cognitive_1 = require("./azure-cognitive");
const google_vision_1 = require("./google-vision");
const azure_models_1 = require("./models/azure/azure-models");
const helperAWS = new aws_rekognition_1.AWSRekognition();
const helperAzure = new azure_cognitive_1.AzureCognitive();
const amazonLaurie1 = helperAWS.DetectFacesOnLocalImage(__dirname + "/../images/laurie.jpg").then((data) => {
    console.log(data.FaceDetails[0].AgeRange.High);
}).catch((err) => {
    console.error(err);
});
const amazonLaurie2 = helperAWS.DetectFacesOnS3Images("immaginisalvatore", "laurie.jpg").then((data) => {
    console.log(data);
    console.log(data.FaceDetails[0].AgeRange.High);
}).catch((err) => {
    console.error(err);
});
const response = helperAWS.DetectLabelsOnS3Image("immaginisalvatore", "cena.jpg").then((data) => {
    data.Labels.forEach((label) => {
        console.log(label.Name + ": " + label.Confidence);
    });
}).catch((err) => {
    console.error(err);
});
const responseAzure1 = helperAzure.AnalyzeImage("../images/laurie.jpg", new azure_models_1.AzureRequestParameters({
    language: "en",
    visualFeatures: ["Faces", "ImageType"],
})).then((data) => {
    data.faces.forEach((face) => {
        console.log(face);
    });
});
const responseAzure2 = helperAzure.AnalyzeImage("../images/laurie.jpg", new azure_models_1.AzureRequestParameters({
    details: ["celebrities"],
    language: "en",
    visualFeatures: ["Categories", "Faces", "ImageType"],
})).then((data) => {
    console.log(data);
});
const responseAzure3 = helperAzure.AnalyzeImage("/../images/cena.jpg", new azure_models_1.AzureRequestParameters({
    language: "en",
    visualFeatures: ["Description", "Categories", "Tags", "Faces", "ImageType"],
})).then((data) => {
    data.tags.forEach((tag) => {
        console.log(`${tag.name} : ${tag.confidence}`);
    });
});
const googleVision = new google_vision_1.GoogleVision("proveblexincordova", "/Users/salvatore/Documents/credenzialiGoogleVision.json");
googleVision.detectFaces(__dirname + "/../images/laurie.jpg").then((data) => {
    console.log(data[0]);
});
googleVision.detectObjects(__dirname + "/../images/cena.jpg").then((objects) => {
    objects.forEach((obj) => {
        console.log(`Name: ${obj.name}`);
        console.log(`Confidence: ${obj.score}`);
        const vertices = obj.boundingPoly.normalizedVertices;
        vertices.forEach((v) => console.log(`x: ${v.x}, y:${v.y}`));
    });
});
