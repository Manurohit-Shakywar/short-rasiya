"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import 'module-alias/register';
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const Router_1 = __importDefault(require("./routers/Router"));
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// enable files upload
if (process.env.DEVELOPMENT) {
    app.use((0, express_fileupload_1.default)({
        createParentPath: true,
        useTempFiles: false,
        tempFileDir: process.cwd() + "/uploads/",
        limits: {
            fileSize: 50 * 1024 * 1024 * 1024 //50MB max file(s) size
        },
    }));
}
else {
    app.use((0, express_fileupload_1.default)({
        createParentPath: true,
        useTempFiles: true,
        // tempFileDir: process.cwd() + "/uploads/",
        limits: {
            fileSize: 50 * 1024 * 1024 * 1024 //50MB max file(s) size
        },
    }));
}
app.use(express_1.default.static('uploads'));
// app.use('/uploads', express.static("/uploads"));
app.use('/', Router_1.default);
app.listen(port, () => console.log(`Running on Port \n http://localhost:${port}`));
//# sourceMappingURL=Server.js.map