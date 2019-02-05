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
class GoogleVision {
    constructor(projectId, keyFileName) {
        this.projectId = projectId;
        this.keyFileName = keyFileName;
        this.vision = require("@google-cloud/vision");
        this.fs = require("fs");
        this.client = new this.vision.ImageAnnotatorClient({
            keyFilename: this.keyFileName,
            projectId: this.projectId,
        });
    }
    detectFaces(inputFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = { image: { source: { filename: inputFile } } };
            const results = yield this.client.faceDetection(request);
            const faces = results[0].faceAnnotations;
            return faces;
        });
    }
    detectObjects(inputFile) {
        return __awaiter(this, void 0, void 0, function* () {
            const request = { image: { content: this.fs.readFileSync(inputFile) } };
            const [result] = yield this.client.objectLocalization(request);
            const objects = result.localizedObjectAnnotations;
            return objects;
        });
    }
}
exports.GoogleVision = GoogleVision;
