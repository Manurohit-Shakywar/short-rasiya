import path from "path";
import fs from 'fs'

import {Storage} from "@google-cloud/storage";
import {bucketName, keyFilename} from "constants/constant";
import * as process from "process";

const storage = new Storage({
    keyFilename: keyFilename, // Path to service account key file
});
// Creates a reference to the bucket
const bucket = storage.bucket(bucketName);
// Uploads a local file to the bucket

// Uploads a file to the bucket
async function uploadFileToBucket(bucketName: any, file: any) {
    // Gets the name of the file
    // const fileName = `${uuidv4()}-${file.name}`;
    const fileName = file.name;

    // Creates a reference to the bucket
    const bucket = storage.bucket(bucketName);

    // Creates a write stream to the file in the bucket
    const fileStream = bucket.file(fileName).createWriteStream({
        metadata: {
            contentType: file.mimetype,

        },
    });

    // Pipes the file data to the write stream
    fileStream.end(file.data);

    console.log(`${fileName} uploaded to ${bucketName}.`);

    return `${process.env.ImageBaseUrl + fileName}`;
}


const FileUtils = {


    async uploadFile(req: any, res: any) {

        try {
            // Checks if file was uploaded
            if (!req.files || Object.keys(req.files).length === 0) {
                return res.status(400).send('No files were uploaded.');
            }
            // Uploads the file to the bucket
            const fileName = await uploadFileToBucket(bucketName, req.files.file);

            res.json(`File uploaded to Google Cloud Storage as ${fileName}`);
        } catch (err) {
            console.error(err);
            res.status(500).json('An error occurred while uploading the file to Google Cloud Storage.');
        }

    },


    async addFile(file: any, folderName: any, resource_type?: "image" | "video" | "raw" | "auto") {

        console.log('File:', file);

        if (!file) {
            return null
        }
        console.log('Test', process.env.DEVELOPMENT);
        if (process.env.DEVELOPMENT) {
            const newPath = path.join(process.cwd(), 'uploads', file.name)
            const result = await file.mv(newPath)
            console.log(result)
            return `http://localhost:3000/${file.name}`

        } else {
            const options = {
                use_filename: true,
                unique_filename: false,
                overwrite: true,
                resource_type: resource_type,
                public_id: folderName + file.name
            };
        }
    },

    async removeFile(file: any) {
        // const newPath = path.join(process.cwd(), 'uploads', file.name)
        fs.unlink(file.tempFilePath, (err) => {
            if (err) {
                console.log("File not deleted ");
                return
            }
            console.log('File successfully deleted..');

        })

        // fs.unlink(file.tempFilePath)
    }

}

export default FileUtils
