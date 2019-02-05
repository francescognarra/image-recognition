## image-recognition
A typescript project showing how to connect to the following AI cloud services: Azure Cognitive Services, Amazon Rekognition and Google Vision

* Execute npm install in the folder containing the cloned repository

* Create all the accounts and keys to connect to the cloud providers. In the configuration folder you'll find three files where such data must be put:
    * credentialsAmazon.json
    * credentialsAzure.ts
    * credenzialiGoogleVision.json

* Launch Visual Studio Code in debug mode and follow the execution starting from index.ts

* Or you can launch from the root folder the command  **tsc** to build the javascript files in the **dist** folder. From the command line you can launch the command **node index.js** but be careful about the relative paths of the **images** and **configurations** folder 