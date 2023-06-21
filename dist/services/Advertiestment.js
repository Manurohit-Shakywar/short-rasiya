"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Utils_1 = __importDefault(require("../utils/Utils"));
const prisma = new client_1.PrismaClient();
const addAdvertiesment = (req, res) => {
    console.log(req.body);
    prisma.advertiesment.create({ data: req === null || req === void 0 ? void 0 : req.body }).then(result => {
        res.json({
            status: true,
            message: "Successfully save...",
        });
    }).catch(err => {
        res.json({
            status: true,
            message: Utils_1.default.onError(err),
        });
    });
};
const getAdvertiesment = (req, res) => {
    prisma.advertiesment.findMany().then(result => {
        res.json({
            status: true,
            message: "Successfully fetch...",
            result
        });
    }).catch(err => {
        res.json({
            status: true,
            message: Utils_1.default.onError(err),
        });
    });
};
const deleteAdvertiesment = (req, res) => {
    prisma.advertiesment.findUnique({ where: { id: req.body.id } }).then(result => {
        res.json({
            status: true,
            message: "Successfully delete...",
            result
        });
    }).catch(err => {
        res.json({
            status: true,
            message: Utils_1.default.onError(err),
        });
    });
};
exports.default = { addAdvertiesment, getAdvertiesment, deleteAdvertiesment };
//# sourceMappingURL=Advertiestment.js.map