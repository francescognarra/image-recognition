"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AWS = require("aws-sdk");
const fileHelpers_1 = require("./helpers/fileHelpers");
class AWSRekognition {
    constructor() {
        AWS.config.region = "eu-west-1"; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            IdentityPoolId: "eu-west-1_XkG4EULaG",
        });
        AWS.config.loadFromPath(__dirname + "/../configuration/credentialsAmazon.json");
        this.rekognition = new AWS.Rekognition();
    }
    DetectFacesOnLocalImage(filePath) {
        const buffer = fileHelpers_1.readImage(filePath);
        const params = {
            Attributes: [
                "ALL",
            ],
            Image: {
                Bytes: buffer,
            },
        };
        return this.rekognition.detectFaces(params).promise();
    }
    DetectFacesOnS3Images(bucketName, key) {
        const params = {
            Attributes: [
                "ALL",
            ],
            Image: {
                S3Object: {
                    Bucket: bucketName,
                    Name: key,
                },
            },
        };
        return this.rekognition.detectFaces(params).promise();
    }
    DetectCelebritiesOnS3Image(bucketName, key) {
        const params = {
            Image: {
                S3Object: {
                    Bucket: bucketName,
                    Name: key,
                },
            },
        };
        const p = this.rekognition.recognizeCelebrities(params).promise();
        return this.rekognition.recognizeCelebrities(params).promise();
    }
    DetectLabelsOnS3Image(bucketName, key) {
        const params = {
            Image: {
                S3Object: {
                    Bucket: bucketName,
                    Name: key,
                },
            },
        };
        return this.rekognition.detectLabels(params).promise();
    }
}
exports.AWSRekognition = AWSRekognition;
