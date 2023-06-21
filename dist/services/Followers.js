"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const Utils_1 = __importDefault(require("../utils/Utils"));
const prisma = new client_1.PrismaClient();
const getFollowers = (req, res) => {
    var _a, _b, _c, _d;
    const userId = ((_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userId) === null || _b === void 0 ? void 0 : _b.length) > 0 ? (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.userId : (_d = req.user) === null || _d === void 0 ? void 0 : _d.userId;
    const isFollow = req.body.isFollow === 'true';
    prisma.followers.findMany({
        where: { followerUserId: userId, AND: [{
                    isFollow: isFollow,
                    isFollowing: !isFollow
                }] },
        select: {
            id: true,
            followerUserId: true,
            createdAt: true,
            updatedAt: true,
            isFollow: true,
            user: {
                select: {
                    userName: true,
                    email: true,
                    userId: true,
                    profile: {
                        select: {
                            fullName: true,
                            profileImg: true
                        }
                    }
                }
            },
        },
    }).then(result => {
        res.json({
            status: true,
            message: 'Successfully fetch...',
            result
        });
    }).catch(err => {
        res.json({ status: false, message: Utils_1.default.onError(err) });
    });
};
const addFollower = (req, res) => {
    prisma.followers.findMany({
        where: {
            userId: req.body.userId
        }
    }).then(data => {
        var _a, _b;
        if ((data === null || data === void 0 ? void 0 : data.length) === 0) {
            prisma.followers.create({
                data: {
                    followerUserId: req.user.userId,
                    userId: req.body.userId,
                    isFollow: req.body.isFollow === 'true'
                }
            }).then(result => {
                res.json({
                    status: true,
                    message: 'Successfully Follow...',
                    result
                });
            }).catch((err) => {
                res.json({ status: false, message: Utils_1.default.onError(err) });
            });
        }
        else {
            prisma.followers.update({
                where: { id: (_b = (_a = data[0]) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : req.body.id },
                data: { isFollow: req.body.isFollow === 'true', }
            }).then(result => {
                res.json({
                    status: true,
                    message: req.body.isFollow === 'true' ? 'Successfully follow...' : 'Successfully unfollow...',
                    result
                });
            }).catch((err) => {
                res.json({
                    status: false,
                    message: Utils_1.default.onError(err)
                });
            });
        }
    }).catch(err => {
        res.json({
            status: false,
            message: Utils_1.default.onError(err)
        });
    });
};
exports.default = { addFollower, getFollowers };
//# sourceMappingURL=Followers.js.map