"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import Advertiestment from "@services/Advertiestment";
const Advertiestment_1 = __importDefault(require("../services/Advertiestment"));
const Utils_1 = __importDefault(require("../utils/Utils"));
const addAdvertiesment = (req, res) => {
    const { brandName, link } = req.body;
    if (Utils_1.default.isEmpty(link)) {
        res.json({
            status: false,
            message: "Require link...",
        });
    }
    else {
        Advertiestment_1.default.addAdvertiesment(req, res);
    }
};
const getAdvertiesment = (req, res) => {
    Advertiestment_1.default.getAdvertiesment(req, res);
};
const deleteAdvertiesment = (req, res) => {
    if (Utils_1.default.isEmpty(req.body.id)) {
        return res.json({
            status: false,
            message: "Require id...",
        });
    }
    Advertiestment_1.default.deleteAdvertiesment(req, res);
};
exports.default = { addAdvertiesment, getAdvertiesment, deleteAdvertiesment };
//# sourceMappingURL=Advertiestment.js.map