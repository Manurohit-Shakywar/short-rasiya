"use strict";
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
const Users_1 = __importDefault(require("../controllers/Users"));
const Auth_1 = __importDefault(require("../auth/Auth"));
const express_1 = require("express");
const Search_1 = __importDefault(require("../controllers/Search"));
const Like_1 = __importDefault(require("../controllers/Like"));
const Videos_1 = __importDefault(require("../controllers/Videos"));
const Comment_1 = __importDefault(require("../controllers/Comment"));
const Advertiestment_1 = __importDefault(require("../controllers/Advertiestment"));
const Followers_1 = __importDefault(require("../controllers/Followers"));
const FileUtils_1 = __importDefault(require("../utils/FileUtils"));
const routes = (0, express_1.Router)();
// Post Router............
routes.post('/login', Users_1.default.login);
routes.post('/register', Users_1.default.register);
routes.post('/socialLogin', Users_1.default.socialLogin);
routes.post('/checkUserName', Users_1.default.checkUserName);
routes.post('/updateProfile', Auth_1.default.isAuthenticated, Users_1.default.updateProfile);
routes.post('/search', Auth_1.default.isAuthenticated, Search_1.default.search);
routes.post('/postVideo', Auth_1.default.isAuthenticated, Videos_1.default.postVideo);
routes.post('/addLIke', Auth_1.default.isAuthenticated, Like_1.default.addLike);
routes.post('/addComment', Auth_1.default.isAuthenticated, Comment_1.default.addComment);
routes.post('/addComment', Auth_1.default.isAuthenticated, Comment_1.default.addComment);
routes.post('/addAdvertiesment', Auth_1.default.isAuthenticated, Advertiestment_1.default.addAdvertiesment);
routes.post('/deleteAdvertiesment', Auth_1.default.isAuthenticated, Advertiestment_1.default.deleteAdvertiesment);
routes.post('/addFollower', Auth_1.default.isAuthenticated, Followers_1.default.addFollower);
routes.post('/getFollower', Auth_1.default.isAuthenticated, Followers_1.default.getFollowers);
routes.post('/getVideos', Auth_1.default.isAuthenticated, Videos_1.default.getVideos);
routes.post('/getProfile', Auth_1.default.isAuthenticated, Users_1.default.getProfile);
// Get Router..............
routes.get('/getComment', Auth_1.default.isAuthenticated, Comment_1.default.getComment);
routes.get('/getAdvertiesment', Auth_1.default.isAuthenticated, Advertiestment_1.default.getAdvertiesment);
routes.get('/getSession', Auth_1.default.isAuthenticated, Users_1.default.getSession);
routes.post('/upload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log("Req:",req.files.myFile);
    const file = yield FileUtils_1.default.uploadFile(req, res);
    console.log('file:', file);
    res.json(file);
}));
// for testing purpose
routes.get('/', (req, res) => {
    res.json("Api Successfully work ");
});
// redirect routes when routes not found
routes.all('*', (req, res) => {
    res.status(200).json({
        status: false,
        message: 'Sorry invalid request'
    });
});
exports.default = routes;
//# sourceMappingURL=Router.js.map