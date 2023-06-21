"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class Utils {
    static isEmpty(str) {
        return (!(str === null || str === void 0 ? void 0 : str.trim()) || (str === null || str === void 0 ? void 0 : str.trim().length) === 0);
    }
    static getFileName(fileName) {
        return new Date().getTime() + '_' + fileName.replaceAll(/ /g, '_');
    }
    // static async getFile(files: any) {
    //     let fileName = files?.file as UploadedFile
    //     let newPath = path.join(process.cwd(), 'uploads', Utils.getFileName(fileName?.name))
    //     const result = await fileName.mv(newPath)
    //     console.log(result)
    //     return newPath
    // }
    static _isExistUserId(userId) {
        return prisma.users.findUnique({ where: { userId: userId } }).then((result) => {
            return !!result;
        }).catch((e) => {
            return false;
        });
    }
    static onError(err) {
        var _a, _b, _c, _d, _e, _f, _g;
        // console.log(err);
        const error = JSON.parse(JSON.stringify(err));
        console.log(error);
        if (((_a = error === null || error === void 0 ? void 0 : error.meta) === null || _a === void 0 ? void 0 : _a.target) === 'Users_email_key') {
            return 'Email already exist..';
        }
        else if (((_b = error === null || error === void 0 ? void 0 : error.meta) === null || _b === void 0 ? void 0 : _b.target) === 'Profile_mobile_key') {
            return 'Mobile number already exist..';
        }
        else if (((_c = error === null || error === void 0 ? void 0 : error.meta) === null || _c === void 0 ? void 0 : _c.target) === 'Users_userName_key') {
            return 'Username already exist..';
        }
        else {
            return (_g = (_e = (_d = error === null || error === void 0 ? void 0 : error.meta) === null || _d === void 0 ? void 0 : _d.target) !== null && _e !== void 0 ? _e : (_f = error === null || error === void 0 ? void 0 : error.meta) === null || _f === void 0 ? void 0 : _f.cause) !== null && _g !== void 0 ? _g : 'Something went wrong....';
        }
    }
}
Utils.PAGE_NUMBER = 2;
Utils.VIDEO_PAGE = 2;
Utils.PROFILE_VIDEO_PAGE = 2;
Utils.FOLLOWER_PAGE = 2;
Utils.NOTIFICATION_PAGE = 2;
Utils.isEmail = (email) => {
    let regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return !(email === null || email === void 0 ? void 0 : email.match(regexEmail));
};
Utils.isValidUrl = (url) => {
    var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
        '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
    return !!urlPattern.test(url);
};
exports.default = Utils;
//# sourceMappingURL=Utils.js.map