"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Users_1 = __importDefault(require("../services/Users"));
const Utils_1 = __importDefault(require("../utils/Utils"));
const register = (req, res) => {
    const { email, userName, password, loginType, deviceToken, deviceType, socialId, fullName, mobile, dob } = req.body;
    if (Utils_1.default.isEmpty(fullName)) {
        res.json({
            status: false,
            message: 'Require fullName...'
        });
    }
    else if (Utils_1.default.isEmpty(email)) {
        res.json({
            status: false,
            message: 'Require email...'
        });
    }
    else if (Utils_1.default.isEmail(email)) {
        res.json({
            status: false,
            message: 'Require valid email...'
        });
    }
    else if (Utils_1.default.isEmpty(userName)) {
        res.json({
            status: false,
            message: 'Require userName...'
        });
    }
    else if (Utils_1.default.isEmpty(password)) {
        res.json({
            status: false,
            message: 'Require password...'
        });
    }
    else if (Utils_1.default.isEmpty(loginType)) {
        res.json({
            status: false,
            message: 'Require loginType...'
        });
    }
    else if (Utils_1.default.isEmpty(deviceToken)) {
        res.json({
            status: false,
            message: 'Require deviceToken...'
        });
    }
    else if (Utils_1.default.isEmpty(deviceType)) {
        res.json({
            status: false,
            message: 'Require deviceType...'
        });
    }
    else {
        Users_1.default.register(req, res);
    }
};
const login = (req, res) => {
    const { email, password, deviceToken, deviceType } = req.body;
    if (Utils_1.default.isEmpty(email)) {
        res.json({
            status: false,
            message: 'Require email...'
        });
    }
    else if (Utils_1.default.isEmail(email)) {
        res.json({
            status: false,
            message: 'Require valid email...'
        });
    }
    else if (Utils_1.default.isEmpty(password)) {
        res.json({
            status: false,
            message: 'Require password...'
        });
    }
    else if (Utils_1.default.isEmpty(deviceToken)) {
        res.json({
            status: false,
            message: 'Require deviceToken...'
        });
    }
    else if (Utils_1.default.isEmpty(deviceType)) {
        res.json({
            status: false,
            message: 'Require deviceType...'
        });
    }
    else {
        Users_1.default.login(req, res);
    }
};
const getUsers = (req, res) => {
    Users_1.default.getUsers(req, res);
};
const updateProfile = (req, res) => {
    Users_1.default.updateProfile(req, res);
};
const socialLogin = (req, res) => {
    Users_1.default.socialLogin(req, res);
};
const getSession = (req, res) => {
    Users_1.default.getSession(req, res);
};
const getProfile = (req, res) => {
    if (Utils_1.default.isEmpty(req.body.page)) {
        return res.json({
            status: false,
            message: "Require page...",
        });
    }
    Users_1.default.getProfile(req, res);
};
const checkUserName = (req, res) => {
    if (Utils_1.default.isEmpty(req.body.userName)) {
        return res.json({
            status: false,
            message: "Require userName",
        });
    }
    Users_1.default.checkUserName(req, res);
};
const adminLogin = (req, res) => {
};
const logOut = (req, res) => {
};
exports.default = { register, adminLogin, logOut, getUsers, login, updateProfile, socialLogin, getSession, getProfile, checkUserName };
//# sourceMappingURL=Users.js.map