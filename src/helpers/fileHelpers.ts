import * as fs from "fs";
export function readImage(path: string): Buffer {
   const fileData = fs.readFileSync(path).toString("base64");
   return new Buffer(fileData, "base64");
}
export function readImageForAzure(path: string): Buffer {
   const fileData = fs.readFileSync(path).toString("hex");
   const result = [];
   for (let i = 0; i < fileData.length; i += 2 ) {
      result.push(parseInt(fileData[i] + "" +
      fileData[i + 1], 16));
   }
   return new Buffer(result);
}
