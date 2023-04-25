import path from "path";
import fs from 'fs'

import { v2 as cloudinary } from 'cloudinary'

const FileUtils = {


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

            try {

                // Upload the image
                const result = await cloudinary.uploader.upload(file.tempFilePath, options);
                await this.removeFile(file)
                return result.url;
            } catch (error) {
                await this.removeFile(file)
            }
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
