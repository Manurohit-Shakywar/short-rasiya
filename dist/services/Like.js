"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Utils_1 = __importDefault(require("../utils/Utils"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const addLike = (req, res) => {
    prisma.likes.findMany({
        where: {
            videoId: req.body.videoId,
            userId: req.user.userId
        }
    }).then((data) => {
        var _a, _b;
        // console.log("Data:",data)
        if (data.length === 0) {
            prisma.likes.create({
                data: {
                    isLike: req.body.isLike === 'true',
                    userId: req.user.userId,
                    videoId: req.body.videoId,
                }
            }).then((result) => {
                res.json({
                    status: true,
                    message: 'Successfully like...',
                    result
                });
            }).catch((err) => {
                res.json({
                    status: false,
                    message: Utils_1.default.onError(err)
                });
            });
        }
        else {
            prisma.likes.update({
                where: { id: (_b = (_a = data[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : req.body.videoId },
                data: { isLike: req.body.isLike === 'true', }
            }).then((result) => {
                res.json({
                    status: true,
                    message: req.body.isLike === 'true' ? 'Successfully like...' : 'Successfully unlike...',
                    result,
                });
            }).catch((err) => {
                res.json({
                    status: false,
                    message: Utils_1.default.onError(err)
                });
            });
        }
    }).catch((err) => {
        res.json({
            status: false,
            message: Utils_1.default.onError(err)
        });
    });
};
exports.default = { addLike };
//# sourceMappingURL=Like.js.map