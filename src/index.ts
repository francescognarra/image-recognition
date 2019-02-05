import { AWSRekognition } from "./aws-rekognition";
import { AzureCognitive } from "./azure-cognitive";
import { GoogleVision } from "./google-vision";
import { AzureRequestParameters } from "./models/azure/azure-models";
import { IAzureCognitiveServiceResponse } from "./models/azure/azure-output-models";

const helperAWS: AWSRekognition = new AWSRekognition();
const helperAzure: AzureCognitive = new AzureCognitive();

const amazonLaurie1 = helperAWS.DetectFacesOnLocalImage(__dirname + "/../images/laurie.jpg").then(
    (data) => {
        console.log(data.FaceDetails[0].AgeRange.High);
}).catch((err) => {
    console.error(err);
});

const amazonLaurie2 = helperAWS.DetectFacesOnS3Images("immaginisalvatore", "laurie.jpg").then(
    (data) => {
        console.log(data);
        console.log(data.FaceDetails[0].AgeRange.High);
}).catch((err) => {
    console.error(err);
});

const response = helperAWS.DetectLabelsOnS3Image("immaginisalvatore", "cena.jpg").then(
    (data) => {
        data.Labels.forEach((label) => {
            console.log(label.Name + ": " + label.Confidence);
        });
}).catch((err) => {
    console.error(err);
});

const responseAzure1 = helperAzure.AnalyzeImage("../images/laurie.jpg", new AzureRequestParameters({
    language: "en",
    visualFeatures: ["Faces", "ImageType"],
})).then((data: IAzureCognitiveServiceResponse) => {
    data.faces.forEach( (face) => {
        console.log(face);
    });
});

const responseAzure2 = helperAzure.AnalyzeImage("../images/laurie.jpg", new AzureRequestParameters({
    details: ["celebrities"],
    language: "en",
    visualFeatures: ["Categories", "Faces", "ImageType"],
})).then((data: IAzureCognitiveServiceResponse) => {
    console.log(data);
});

const responseAzure3 = helperAzure.AnalyzeImage("/../images/cena.jpg", new AzureRequestParameters({
    language: "en",
    visualFeatures: ["Description", "Categories", "Tags", "Faces", "ImageType"],
})).then((data: IAzureCognitiveServiceResponse) => {
    data.tags.forEach( (tag) => {
       console.log(`${tag.name} : ${tag.confidence}`);
});
});

const googleVision =
    new GoogleVision("proveblexincordova", "/Users/salvatore/Documents/credenzialiGoogleVision.json");

googleVision.detectFaces(__dirname + "/../images/laurie.jpg").then((data: any)  => {
    console.log(data[0]);
});

googleVision.detectObjects(__dirname + "/../images/cena.jpg").then((objects: any) => {
        objects.forEach((obj: any) => {
        console.log(`Name: ${obj.name}`);
        console.log(`Confidence: ${obj.score}`);
        const vertices = obj.boundingPoly.normalizedVertices;
        vertices.forEach((v: any) => console.log(`x: ${v.x}, y:${v.y}`));
    });
});
