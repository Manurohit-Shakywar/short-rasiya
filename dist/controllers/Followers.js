"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Followers_1 = __importDefault(require("../services/Followers"));
const Utils_1 = __importDefault(require("../utils/Utils"));
const addFollower = (req, res) => {
    const { userId, isFollow } = req.body;
    if (Utils_1.default.isEmpty(userId)) {
        res.json({
            status: false,
            message: "Require userId..."
        });
    }
    else if (Utils_1.default.isEmpty(isFollow)) {
        res.json({
            status: false,
            message: "Require isFollow..."
        });
    }
    else {
        Followers_1.default.addFollower(req, res);
    }
};
const getFollowers = (req, res) => {
    var _a;
    if (Utils_1.default.isEmpty((_a = req.body) === null || _a === void 0 ? void 0 : _a.isFollow)) {
        return res.json({
            status: false,
            message: 'Require isFollow...'
        });
    }
    Followers_1.default.getFollowers(req, res);
};
exports.default = { addFollower, getFollowers };
//# sourceMappingURL=Followers.js.map