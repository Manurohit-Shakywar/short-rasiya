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
const client_1 = require("@prisma/client");
const Utils_1 = __importDefault(require("../utils/Utils"));
const FileUtils_1 = __importDefault(require("../utils/FileUtils"));
const prisma = new client_1.PrismaClient();
const postVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { title, description, artiestName, isCommentShow, isPublic, isDuet, isLikeShow, isDownload, userId } = req.body;
    const path = (_b = yield FileUtils_1.default.addFile((_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.path, 'ShortVideo', 'video')) !== null && _b !== void 0 ? _b : '';
    // const thumbnail = await FileUtils.addFile(req?.files?.thumbnail, 'Thumbnails', 'image') ?? '';
    prisma.videos.create({
        data: {
            title: title,
            description: description !== null && description !== void 0 ? description : '',
            artiestName: artiestName,
            userId: (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.userId,
            path: path,
            thumbnail: "",
        }
    }).then(result => {
        res.json({
            status: true,
            message: 'Video successfully save...',
            result
        });
    }).catch(err => {
        res.json({ status: false, message: Utils_1.default.onError(err) });
    });
});
const getVideos = (req, res) => {
    const num = parseInt(req.body.page) - 1;
    const skip = Utils_1.default.PAGE_NUMBER * num;
    prisma.videos.findMany({
        skip: skip,
        take: Utils_1.default.PAGE_NUMBER,
        include: {
            likes: {
                select: {
                    isLike: true,
                }
            },
            user: {
                select: {
                    userName: true,
                    profile: {
                        select: {
                            profileImg: true,
                        }
                    }
                }
            }
        },
    }).then((result) => __awaiter(void 0, void 0, void 0, function* () {
        const totalCount = Math.round((yield prisma.videos.count()) / Utils_1.default.PAGE_NUMBER);
        res.json({
            status: true,
            message: 'Successfully fetch...',
            totalCount,
            result: result.map((i) => {
                var _a, _b;
                i.likes.length > 0 && i.likes[0].isLike ? i.isLike = true : i.isLike = false;
                i.userName = i.user.userName;
                i.profileImg = (_b = (_a = i.user) === null || _a === void 0 ? void 0 : _a.profile) === null || _b === void 0 ? void 0 : _b.profileImg;
                delete i.likes;
                delete i.user;
                return i;
            })
        });
    })).catch(err => res.json({ status: false, message: Utils_1.default.onError(err) }));
};
exports.default = { postVideo, getVideos };
//# sourceMappingURL=Videos.js.map