"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Comment_1 = __importDefault(require("../services/Comment"));
const Utils_1 = __importDefault(require("../utils/Utils"));
const getComment = (req, res) => {
    if (Utils_1.default.isEmpty(req.query.id)) {
        return res.json({
            status: false,
            message: "Require id..."
        });
    }
    Comment_1.default.getComment(req, res);
};
const addComment = (req, res) => {
    var _a, _b;
    if (Utils_1.default.isEmpty((_a = req.body) === null || _a === void 0 ? void 0 : _a.videoId)) {
        res.json({
            status: false,
            message: "Require videoId..."
        });
    }
    else if (Utils_1.default.isEmpty((_b = req.body) === null || _b === void 0 ? void 0 : _b.comment)) {
        res.json({
            status: false,
            message: "Require comment..."
        });
    }
    else {
        Comment_1.default.addComment(req, res);
    }
};
exports.default = { getComment, addComment };
//# sourceMappingURL=Comment.js.map