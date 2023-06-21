"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Like_1 = __importDefault(require("../services/Like"));
const Utils_1 = __importDefault(require("../utils/Utils"));
const addLike = (req, res) => {
    const { videoId, isLike } = req.body;
    if (Utils_1.default.isEmpty(videoId)) {
        res.json({
            status: false,
            message: "Require videoId...",
        });
    }
    else if (Utils_1.default.isEmpty(isLike)) {
        res.json({
            status: false,
            message: "Require isLike...",
        });
    }
    else {
        Like_1.default.addLike(req, res);
    }
};
exports.default = { addLike };
//# sourceMappingURL=Like.js.map