import Users from "../services/Users"
import Utils from "../utils/Utils";
import { Request, Response } from "express"



const register = (req: Request, res: Response) => {
    const { email, userName, password, loginType, deviceToken, deviceType, socialId, fullName, mobile, dob } = req.body;
    if (Utils.isEmpty(fullName)) {
        res.json({
            status: false,
            message: 'Require fullName...'
        })

    }
    else if (Utils.isEmpty(email)) {
        res.json({
            status: false,
            message: 'Require email...'
        })

    } else if (Utils.isEmail(email)) {
        res.json({
            status: false,
            message: 'Require valid email...'
        })

    } else if (Utils.isEmpty(userName)) {
        res.json({
            status: false,
            message: 'Require userName...'
        })

    }
    else if (Utils.isEmpty(password)) {
        res.json({
            status: false,
            message: 'Require password...'
        })

    }
    else if (Utils.isEmpty(loginType)) {
        res.json({
            status: false,
            message: 'Require loginType...'
        })

    }
    else if (Utils.isEmpty(deviceToken)) {
        res.json({
            status: false,
            message: 'Require deviceToken...'
        })

    } else if (Utils.isEmpty(deviceType)) {
        res.json({
            status: false,
            message: 'Require deviceType...'
        })

    } else {
        Users.register(req, res)
    }


}
const login = (req: Request, res: Response) => {
    const { email, password, deviceToken, deviceType } = req.body;
    if (Utils.isEmpty(email)) {
        res.json({
            status: false,
            message: 'Require email...'
        })

    } else if (Utils.isEmail(email)) {
        res.json({
            status: false,
            message: 'Require valid email...'
        })

    }
    else if (Utils.isEmpty(password)) {
        res.json({
            status: false,
            message: 'Require password...'
        })
    }
    else if (Utils.isEmpty(deviceToken)) {
        res.json({
            status: false,
            message: 'Require deviceToken...'
        })

    } else if (Utils.isEmpty(deviceType)) {
        res.json({
            status: false,
            message: 'Require deviceType...'
        })

    } else {
        Users.login(req, res)
    }

}

const getUsers = (req: Request, res: Response) => {

    Users.getUsers(req, res)
}

const updateProfile = (req: Request, res: Response) => {
    Users.updateProfile(req, res)
}
const socialLogin = (req: Request, res: Response) => {

    Users.socialLogin(req, res)
}
const getSession = (req: Request, res: Response) => {
    Users.getSession(req, res)

}
const getProfile = (req: Request, res: Response) => {
    if (Utils.isEmpty(req.body.page)) {
        return res.json({
            status: false,
            message: "Require page...",
        })
    }
    Users.getProfile(req, res);
}
const checkUserName = (req: Request, res: Response) => {
    if (Utils.isEmpty(req.body.userName)) {
        return res.json({
            status: false,
            message: "Require userName",
        })
    }
    Users.checkUserName(req, res)
}


const adminLogin = (req: Request, res: Response) => {

}
const logOut = (req: Request, res: Response) => {

}



export default { register, adminLogin, logOut, getUsers, login, updateProfile, socialLogin, getSession, getProfile, checkUserName }