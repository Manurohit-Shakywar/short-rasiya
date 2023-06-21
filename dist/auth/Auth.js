"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateAccessToken = (user) => {
    return jsonwebtoken_1.default.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "365d" });
};
// refreshTokens
let refreshTokens = [];
const generateRefreshToken = (user) => {
    const refreshToken = jsonwebtoken_1.default.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "365d" });
    refreshTokens.push(refreshToken);
    return refreshToken;
};
const isAuthenticated = (req, res, next) => {
    var _a;
    const token = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", '');
    if (!token) {
        return res.json({
            status: false,
            isExpire: true,
            message: 'A token is required for authentication'
        });
    }
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        console.log("");
        if (err) {
            res.json({
                status: false,
                isExpire: true,
                message: 'Invalid token!'
            });
        }
        else {
            req.user = user;
            next(); //proceed to the next action in the calling function
        }
    }); //end of jwt.verify()
}; //end of function
exports.default = { isAuthenticated, generateAccessToken, generateRefreshToken };
//# sourceMappingURL=Auth.js.map