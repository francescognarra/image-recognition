import * as AWS from "aws-sdk";
import { PromiseResult } from "aws-sdk/lib/request";
import { readImage } from "./helpers/fileHelpers";

export class AWSRekognition {
    private rekognition: AWS.Rekognition;

    constructor() {
        AWS.config.region = "eu-west-1"; // Region
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: "eu-west-1_XkG4EULaG",
        });
        AWS.config.loadFromPath(__dirname + "/../configuration/credentialsAmazon.json");
        this.rekognition = new AWS.Rekognition();
    }
    public DetectFacesOnLocalImage(filePath: string):
            Promise<PromiseResult<AWS.Rekognition.DetectFacesResponse, AWS.AWSError>> {
            const buffer = readImage(filePath);
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

    public DetectFacesOnS3Images(bucketName: string, key: string):
            Promise<PromiseResult<AWS.Rekognition.DetectFacesResponse, AWS.AWSError>> {
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

    public DetectCelebritiesOnS3Image(bucketName: string, key: string):
        Promise<PromiseResult<AWS.Rekognition.RecognizeCelebritiesResponse, AWS.AWSError>> {
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

    public DetectLabelsOnS3Image(bucketName: string, key: string):
        Promise<PromiseResult<AWS.Rekognition.DetectLabelsResponse, AWS.AWSError>> {
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




