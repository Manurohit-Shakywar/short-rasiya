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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const search = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const videos = yield prisma.videos.findMany({ where: { title: { contains: (_a = req.body) === null || _a === void 0 ? void 0 : _a.text } }, include: {
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
        } });
    const users = yield prisma.users.findMany({
        where: {
            userId: {
                not: (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.userId
            },
            AND: [
                {
                    OR: [
                        {
                            userName: {
                                contains: (_c = req.body.text) !== null && _c !== void 0 ? _c : '',
                            }
                        },
                        {
                            email: {
                                contains: (_d = req.body.text) !== null && _d !== void 0 ? _d : '',
                            },
                        }, {
                            profile: {
                                fullName: {
                                    contains: (_e = req.body.text) !== null && _e !== void 0 ? _e : '',
                                }
                            },
                        },
                    ],
                },
                {},
            ],
        },
        select: {
            userName: true,
            userId: true,
            followers: {
                select: {
                    isFollow: true
                }
            },
            profile: {
                select: {
                    fullName: true,
                    profileImg: true
                }
            }
        }
    });
    res.json({
        status: true,
        message: 'Successfully search...',
        videos: videos.map((i) => {
            var _a, _b;
            i.likes.length > 0 && i.likes[0].isLike ? i.isLike = true : i.isLike = false;
            i.userName = i.user.userName;
            i.profileImg = (_b = (_a = i.user) === null || _a === void 0 ? void 0 : _a.profile) === null || _b === void 0 ? void 0 : _b.profileImg;
            delete i.likes;
            delete i.user;
            return i;
        }),
        users: users.map((i) => {
            var _a;
            i.isFollow = ((_a = i.followers[0]) === null || _a === void 0 ? void 0 : _a.isFollow) ? true : false;
            delete i.followers;
            return i;
        })
    });
});
exports.default = { search };
//# sourceMappingURL=Search.js.map