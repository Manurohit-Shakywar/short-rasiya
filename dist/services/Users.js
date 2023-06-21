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
const bcrypt_1 = __importDefault(require("bcrypt"));
const Auth_1 = __importDefault(require("../auth/Auth"));
const Utils_1 = __importDefault(require("../utils/Utils"));
const prisma = new client_1.PrismaClient();
const socialLogin = (req, res) => {
    const { email, socialId } = req.body;
    prisma.users.findUnique({
        where: {
            email: email,
        },
        select: {
            userId: true,
            email: true,
            userName: true,
            password: true,
            isActive: true,
            isNotification: true,
            socialId: true,
            profile: {
                select: {
                    fullName: true,
                    dob: true,
                    mobile: true,
                    profileImg: true,
                }
            }
        }
    }).then((result) => {
        if (!result)
            return res.json({
                status: true,
                message: 'User not exist',
                isNewUser: true,
            });
        const accessToken = Auth_1.default.generateAccessToken(result);
        const refreshToken = Auth_1.default.generateRefreshToken(result);
        delete result.password;
        // req.session.user = result
        delete result.userId;
        res.json({
            status: true,
            isNewUser: false,
            message: 'Login Successfully...',
            userData: result,
            accessToken,
            refreshToken
        });
    }).catch((err) => {
        res.json({ success: false, message: Utils_1.default.onError(err) });
    });
};
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, deviceToken, deviceType } = req.body;
    const result = yield prisma.users.findUnique({
        where: {
            email: email,
        },
        select: {
            userId: true,
            userName: true,
            email: true,
            password: true,
            isActive: true,
            isNotification: true,
            profile: {
                select: {
                    fullName: true,
                    dob: true,
                    mobile: true,
                    profileImg: true,
                }
            }
        }
    });
    if (result) {
        const checkPassword = bcrypt_1.default.compareSync(password, result.password);
        if (!checkPassword)
            return res.json({
                status: false,
                message: 'Password wrong.....',
            });
        const accessToken = Auth_1.default.generateAccessToken(result);
        const refreshToken = Auth_1.default.generateRefreshToken(result);
        // req.session.user = result
        delete result.password;
        delete result.userId;
        res.json({
            status: true,
            message: 'Login Successfully...',
            userData: result,
            accessToken,
            refreshToken
        });
        prisma.users.update({
            where: { email: result === null || result === void 0 ? void 0 : result.email }, data: {
                deviceToken: deviceToken,
                deviceType: deviceType,
            }
        });
    }
    else {
        res.json({
            status: false,
            message: 'User does not exist..',
        });
    }
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, userName, password, deviceToken, deviceType, loginType, socialId, fullName, mobile, dob, profileImg } = req.body;
    const pass = yield bcrypt_1.default.hash(password, 10);
    prisma.users.create({
        data: {
            email: email,
            userName: userName,
            password: pass,
            loginType: loginType,
            deviceToken: deviceToken,
            deviceType: deviceType,
            socialId: socialId,
            profile: {
                create: {
                    fullName: fullName,
                    mobile: mobile,
                    dob: dob,
                    profileImg: profileImg,
                }
            }
        },
        select: {
            userId: true,
            email: true,
            isActive: true,
            isNotification: true,
            profile: {
                select: {
                    fullName: true,
                    dob: true,
                    mobile: true,
                    profileImg: true,
                }
            }
        }
    }).then((user) => {
        const accessToken = Auth_1.default.generateAccessToken(user);
        const refreshToken = Auth_1.default.generateRefreshToken(user);
        delete user.password;
        // req.session.user = user
        delete user.userId;
        res.json({
            status: true,
            message: 'Register Successfully...',
            userData: user,
            accessToken,
            refreshToken
        });
    }).catch((err) => {
        res.json({ success: false, message: Utils_1.default.onError(err) });
    });
});
const updateProfile = (req, res) => {
    var _a;
    const { deviceToken, deviceType, fullName, dob, profileImg, mobile, userName } = req.body;
    prisma.users.update({
        where: {
            userId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId
        },
        data: {
            deviceToken: deviceToken,
            deviceType: deviceType,
            userName: userName,
            profile: {
                update: {
                    fullName: fullName,
                    dob: dob,
                    profileImg: profileImg,
                    mobile: mobile,
                }
            },
        },
        select: {
            password: false,
            userName: true,
            email: true,
            isNotification: true,
            isActive: true,
            isVerify: true,
            profile: {
                select: {
                    fullName: true,
                    mobile: true,
                    profileImg: true,
                    dob: true,
                    bio: true,
                    address: true,
                }
            }
        }
    }).then((result) => {
        const accessToken = Auth_1.default.generateAccessToken(result);
        const refreshToken = Auth_1.default.generateRefreshToken(result);
        result.accessToken = accessToken;
        result.refreshToken = refreshToken;
        result === null || result === void 0 ? true : delete result.password;
        // req.session.user = result
        result === null || result === void 0 ? true : delete result.userId;
        res.json({
            status: true,
            message: 'Profile updated successfully..',
            userData: result
        });
    }).catch((err) => {
        res.json({ success: false, message: Utils_1.default.onError(err) });
    });
};
const getSession = (req, res) => {
    var _a;
    prisma.users.findUnique({
        where: { userId: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.userId },
        select: {
            password: false,
            userName: true,
            email: true,
            isNotification: true,
            isActive: true,
            isVerify: true,
            profile: {
                select: {
                    fullName: true,
                    mobile: true,
                    profileImg: true,
                    dob: true,
                    bio: true,
                    address: true,
                }
            }
        }
    }).then(result => {
        res.json({
            status: true,
            message: 'Session Successfully fetch...',
            userData: result
        });
    }).catch(err => {
        res.json({
            status: false,
            message: Utils_1.default.onError(err),
        });
    });
};
const adminLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, role } = req.body;
    const user = yield prisma.users.findUnique({
        where: {
            email: email,
        },
        select: {
            userId: true,
            email: true,
            isActive: true,
            role: true,
            isNotification: true,
            profile: {
                select: {
                    fullName: true,
                    dob: true,
                    mobile: true,
                    profileImg: true,
                }
            }
        }
    });
    if (!user)
        return res.json({ status: false, message: 'User does not exist...' });
    const checkPassword = bcrypt_1.default.compareSync(password, user.password);
    if (!checkPassword) {
        res.json({
            status: false,
            message: 'Password wrong.....',
        });
    }
    else if (user.role !== role) {
        res.json({
            status: false,
            message: 'Invalid user.....',
        });
    }
    else {
        const accessToken = Auth_1.default.generateAccessToken(user);
        const refreshToken = Auth_1.default.generateRefreshToken(user);
        delete user.password;
        // req.session.user = user
        delete user.userId;
        res.json({
            status: true,
            message: 'Login Successfully...',
            userData: user,
            accessToken,
            refreshToken
        });
    }
    // console.log(req.session);
});
const logOut = (req, res) => {
    req.user.destroy((err) => {
        if (err)
            return res.json({ status: false, message: 'Something wrong...' });
        res.json({
            status: true,
            message: 'Successfully Logout....'
        });
    });
};
const getUsers = (req, res) => {
    prisma.users.findMany({
        select: {
            userName: true,
            password: false,
            deviceType: true,
            role: true,
            isNotification: true,
            email: true,
            isActive: true,
            loginType: true,
            profile: true
        }
    }).then((result) => res.json({
        status: true,
        message: 'Users List..',
        userData: result
    })).catch((err) => {
        res.json({ success: false, message: Utils_1.default.onError(err) });
    });
};
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    const userId = ((_b = (_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.userId) === null || _b === void 0 ? void 0 : _b.length) > 0 ? (_c = req === null || req === void 0 ? void 0 : req.body) === null || _c === void 0 ? void 0 : _c.userId : (_d = req.user) === null || _d === void 0 ? void 0 : _d.userId;
    const num = parseInt(req.body.page) - 1;
    const skip = Utils_1.default.PAGE_NUMBER * num;
    const result = yield prisma.users.findUnique({
        where: { userId: userId },
        select: {
            _count: {
                select: {
                    videos: true,
                    like: true,
                }
            },
            userName: true,
            profile: {
                select: {
                    fullName: true,
                    profileImg: true,
                },
            },
            videos: {
                skip: skip,
                take: Utils_1.default.PAGE_NUMBER,
            },
            like: {
                where: { isLike: true },
                include: {
                    videos: true
                }
            }
        }
    });
    const followers = yield prisma.followers.count({
        where: { followerUserId: userId, AND: { isFollow: true } }
    });
    const following = yield prisma.followers.count({
        where: { followerUserId: userId, AND: { isFollowing: true } }
    });
    result._count.followers = followers;
    result._count.following = following;
    res.json({
        status: true,
        message: "Successfully fetch...",
        result,
    });
});
const checkUserName = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const isUserNameExist = yield prisma.users.count({ where: { userName: req.body.userName } });
    res.json({
        status: true,
        message: "Successfully fetch...",
        isUserNameExist,
    });
});
exports.default = { register, adminLogin, logOut, getUsers, login, updateProfile, socialLogin, getSession, getProfile, checkUserName };
//# sourceMappingURL=Users.js.map