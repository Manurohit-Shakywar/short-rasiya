"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const storage_1 = require("@google-cloud/storage");
const constant_1 = require("../constants/constant");
const process = __importStar(require("process"));
const storage = new storage_1.Storage({
    keyFilename: constant_1.keyFilename, // Path to service account key file
});
// Creates a reference to the bucket
const bucket = storage.bucket(constant_1.bucketName);
// Uploads a local file to the bucket
// Uploads a file to the bucket
function uploadFileToBucket(bucketName, file) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
const FileUtils = {
    uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Checks if file was uploaded
                if (!req.files || Object.keys(req.files).length === 0) {
                    return res.status(400).send('No files were uploaded.');
                }
                // Uploads the file to the bucket
                const fileName = yield uploadFileToBucket(constant_1.bucketName, req.files.file);
                res.json(`File uploaded to Google Cloud Storage as ${fileName}`);
            }
            catch (err) {
                console.error(err);
                res.status(500).json('An error occurred while uploading the file to Google Cloud Storage.');
            }
        });
    },
    addFile(file, folderName, resource_type) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('File:', file);
            if (!file) {
                return null;
            }
            console.log('Test', process.env.DEVELOPMENT);
            if (process.env.DEVELOPMENT) {
                const newPath = path_1.default.join(process.cwd(), 'uploads', file.name);
                const result = yield file.mv(newPath);
                console.log(result);
                return `http://localhost:3000/${file.name}`;
            }
            else {
                const options = {
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true,
                    resource_type: resource_type,
                    public_id: folderName + file.name
                };
            }
        });
    },
    removeFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            // const newPath = path.join(process.cwd(), 'uploads', file.name)
            fs_1.default.unlink(file.tempFilePath, (err) => {
                if (err) {
                    console.log("File not deleted ");
                    return;
                }
                console.log('File successfully deleted..');
            });
            // fs.unlink(file.tempFilePath)
        });
    }
};
exports.default = FileUtils;
//# sourceMappingURL=FileUtils.js.map