import { PrismaClient } from "@prisma/client";
// import { UploadedFile } from "express-fileupload";
import path from "path";
const prisma = new PrismaClient()

class Utils {

    static PAGE_NUMBER = 2;
    static VIDEO_PAGE = 2;
    static PROFILE_VIDEO_PAGE = 2;
    static FOLLOWER_PAGE = 2;
    static NOTIFICATION_PAGE = 2;

    static isEmail = (email: string) => {
        let regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return !email?.match(regexEmail);
    }

    static isEmpty(str: any) {
        return (!str?.trim() || str?.trim().length === 0);
    }


    static isValidUrl = (url: any) => {
        var urlPattern = new RegExp('^(https?:\\/\\/)?' + // validate protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // validate domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // validate OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // validate port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // validate query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // validate fragment locator
        return !!urlPattern.test(url);
    }

    static getFileName(fileName: any) {
        return new Date().getTime() + '_' + fileName.replaceAll(/ /g, '_');
    }

    // static async getFile(files: any) {
    //     let fileName = files?.file as UploadedFile
    //     let newPath = path.join(process.cwd(), 'uploads', Utils.getFileName(fileName?.name))
    //     const result = await fileName.mv(newPath)
    //     console.log(result)
    //     return newPath
    // }

    static _isExistUserId(userId: any) {

        return prisma.users.findUnique({ where: { userId: userId } }).then((result) => {
            return !!result;

        }).catch((e) => {
            return false
        })

    }

    static onError(err: any) {
        // console.log(err);
        const error = JSON.parse(JSON.stringify(err))
        console.log(error);
        if (error?.meta?.target === 'Users_email_key') {
            return 'Email already exist..'
        } else if (error?.meta?.target === 'Profile_mobile_key') {
            return 'Mobile number already exist..'
        } else if (error?.meta?.target === 'Users_userName_key') {
            return 'Username already exist..'
        } else {
            return error?.meta?.target ?? error?.meta?.cause ?? 'Something went wrong....'
        }
    }


}

export default Utils
