declare function require(name: string): any;

export class GoogleVision {

private vision = require("@google-cloud/vision");
private fs = require("fs");
private client: any;

constructor(private projectId: string, private keyFileName: string) {
    this.client = new this.vision.ImageAnnotatorClient({
        keyFilename: this.keyFileName,
        projectId: this.projectId,
        });
}

public async detectFaces(inputFile: string): Promise<any> {
    const request = {image: {source: {filename: inputFile}}};
    const results = await this.client.faceDetection(request);
    const faces = results[0].faceAnnotations;
    return faces;
}

public async detectObjects(inputFile: string): Promise<any> {
    const request = {image: {content: this.fs.readFileSync(inputFile)}};

    const [result] = await this.client.objectLocalization(request);
    const objects = result.localizedObjectAnnotations;
    return objects;
}
}





