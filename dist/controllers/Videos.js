"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Videos_1 = __importDefault(require("../services/Videos"));
const Utils_1 = __importDefault(require("../utils/Utils"));
const postVideo = (req, res) => {
    var _a, _b;
    if (Utils_1.default.isEmpty(req.body.title)) {
        res.json({
            status: false,
            message: 'title require...'
        });
    }
    else if (!((_a = req.files) === null || _a === void 0 ? void 0 : _a.path)) {
        res.json({
            status: false,
            message: 'path require...'
        });
    }
    else if (!((_b = req.files) === null || _b === void 0 ? void 0 : _b.thumbnail)) {
        res.json({
            status: false,
            message: 'thumbnail require...'
        });
    }
    else {
        Videos_1.default.postVideo(req, res);
    }
};
const getVideos = (req, res) => {
    if (Utils_1.default.isEmpty(req.body.page)) {
        return res.json({
            status: false,
            message: 'Require page...'
        });
    }
    Videos_1.default.getVideos(req, res);
};
exports.default = { getVideos, postVideo };
//# sourceMappingURL=Videos.js.map