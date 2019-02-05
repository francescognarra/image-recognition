"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function readImage(path) {
    const fileData = fs.readFileSync(path).toString("base64");
    return new Buffer(fileData, "base64");
}
exports.readImage = readImage;
function readImageForAzure(path) {
    const fileData = fs.readFileSync(path).toString("hex");
    const result = [];
    for (let i = 0; i < fileData.length; i += 2) {
        result.push(parseInt(fileData[i] + "" +
            fileData[i + 1], 16));
    }
    return new Buffer(result);
}
exports.readImageForAzure = readImageForAzure;
