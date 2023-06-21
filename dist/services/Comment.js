"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Utils_1 = __importDefault(require("../utils/Utils"));
const prisma = new client_1.PrismaClient();
const getComment = (req, res) => {
    var _a;
    prisma.comments.findMany({
        where: { videoId: (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id }, include: {
            user: {
                select: {
                    userName: true,
                    profile: {
                        select: {
                            profileImg: true
                        }
                    }
                }
            }
        }
    }).then(result => {
        console.log(result);
        res.json({
            status: true,
            message: "Successfully fetch...",
            result
        });
    }).catch(err => {
        res.json({
            status: false,
            message: Utils_1.default.onError(err)
        });
    });
};
const addComment = (req, res) => {
    req.body.userId = req.user.userId;
    prisma.comments.create({ data: req.body }).then(result => {
        res.json({
            status: true,
            message: "Successfully save...",
            result
        });
    }).catch(err => {
        res.json({
            status: false,
            message: Utils_1.default.onError(err)
        });
    });
};
exports.default = { getComment, addComment };
//# sourceMappingURL=Comment.js.map