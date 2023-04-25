import { DEVICE_TYPE, PrismaClient } from '@prisma/client'
import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import auth from '@auth';
import Utils from '@utils';

const prisma = new PrismaClient()


const socialLogin = (req: any, res: Response) => {
    const { email, socialId } = req.body

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

    }).then((result: any) => {

        if (!result) return res.json({
            status: true,
            message: 'User not exist',
            isNewUser: true,
        })

        const accessToken = auth.generateAccessToken(result)
        const refreshToken = auth.generateRefreshToken(result)
        result.accessToken = accessToken
        result.refreshToken = refreshToken
        delete result.password
        // req.session.user = result
        delete result.userId
        res.json({
            status: true,
            isNewUser: false,
            message: 'Login Successfully...',
            userData: result
        })

    }).catch(err => {
        res.json({ success: false, message: Utils.onError(err) })
    })

}



const login = async (req: any, res: Response) => {
    const { email, password, deviceToken, deviceType } = req.body

    const result: any = await prisma.users.findUnique({
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
        const checkPassword = bcrypt.compareSync(password, result.password!)
        if (!checkPassword) return res.json(
            {
                status: false,
                message: 'Password wrong.....',
            }
        );
        const accessToken = auth.generateAccessToken(result)
        const refreshToken = auth.generateRefreshToken(result)
        result.accessToken = accessToken
        result.refreshToken = refreshToken
        // req.session.user = result
        delete result.password
        delete result.userId
        res.json(
            {
                status: true,
                message: 'Login Successfully...',
                userData: result
            }
        )

        prisma.users.update({
            where: { email: result?.email }, data: {
                deviceToken: deviceToken,
                deviceType: deviceType,
            }
        })

    } else {
        res.json(
            {
                status: false,
                message: 'User does not exist..',

            }
        )
    }




}


const register = async (req: any, res: Response) => {
    const { email, userName, password, deviceToken, deviceType, loginType, socialId, fullName, mobile, dob, profileImg } = req.body


    const pass = await bcrypt.hash(password, 10)
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


    }).then((user: any) => {
        const accessToken = auth.generateAccessToken(user)
        const refreshToken = auth.generateRefreshToken(user)
        user.accessToken = accessToken
        user.refreshToken = refreshToken
        delete user.password
        // req.session.user = user
        delete user.userId
        res.json(
            {
                status: true,
                message: 'Register Successfully...',
                userData: user
            }
        )
    }).catch(err => {
        res.json({ success: false, message: Utils.onError(err) })
    })

}


const updateProfile = (req: any, res: Response) => {
    const { deviceToken, deviceType, fullName, dob, profileImg, mobile } = req.body

    prisma.users.update({
        where: {
            userId: req?.user?.userId
        },
        data: {
            deviceToken: deviceToken,
            deviceType: deviceType,

            profile: {
                update: {
                    fullName: fullName,
                    dob: dob,
                    profileImg: profileImg,
                    mobile: mobile

                }
            },

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
    }).then((result: any) => {
        const accessToken = auth.generateAccessToken(result)
        const refreshToken = auth.generateRefreshToken(result)
        result.accessToken = accessToken
        result.refreshToken = refreshToken
        delete result?.password
        // req.session.user = result
        delete result?.userId
        res.json({
            status: true,
            message: 'Profile updated successfully..',
            userData: result
        })

    }).catch(err => {
        res.json({ success: false, message: Utils.onError(err) })
    })

}



const getSession = (req: any, res: Response) => {

    res.json({
        status: true,
        message: 'Session Successfully fetch...',
        data: req.user
    })

}


const adminLogin = async (req: any, res: Response) => {
    const { email, password, role } = req.body
    const user: any = await prisma.users.findUnique({
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
    })

    if (!user) return res.json({ status: false, message: 'User does not exist...' })
    const checkPassword = bcrypt.compareSync(password, user.password!)

    if (!checkPassword) {
        res.json({
            status: false,
            message: 'Password wrong.....',

        })
    } else if (user.role !== role) {
        res.json({
            status: false,
            message: 'Invalid user.....',

        })
    } else {
        const accessToken = auth.generateAccessToken(user)
        const refreshToken = auth.generateRefreshToken(user)
        user.accessToken = accessToken
        user.refreshToken = refreshToken
        delete user.password
        // req.session.user = user
        delete user.userId
        res.json(
            {
                status: true,
                message: 'Login Successfully...',
                userData: user
            }
        )
    }
    // console.log(req.session);



}


const logOut = (req: any, res: Response) => {
    req.user.destroy((err: any) => {
        if (err) return res.json({ status: false, message: 'Something wrong...' })
        res.json({
            status: true,
            message: 'Successfully Logout....'
        })
    })
}


const getUsers = (req: Request, res: Response) => {

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

    }).then(result => res.json({
        status: true,
        message: 'Users List..',
        userData: result
    })).catch(err => {
        res.json({ success: false, message: Utils.onError(err) })
    })
}

const getProfile = async (req: any, res: Response) => {

    const userId = req?.query?.userId?.length > 0 ? req?.query?.userId : req.user?.userId
    const result: any = await prisma.users.findUnique({
        where: { userId: userId },
        select: {
            _count: true,
            userName: true,
            profile: {
                select: {
                    fullName: true,
                    profileImg: true,
                },
            },
            videos: true,
            like: {
                where: { isLike: true },
                include: {
                    videos: true
                }
            }
        }

    })


    const following = await prisma.followers.count({
        where: { followerUserId: req?.user?.userId ?? '' }
    })


    result._count.following = following
    res.json({
        status: true,
        message: "Successfully fetch...",
        result,

    })


}



const checkUserName = async (req: Request, res: Response) => {

    const isUserNameExist = await prisma.users.count({ where: { userName: req.body.userName } })
    res.json({
        status: true,
        message: "Successfully fetch...",
        isUserNameExist,

    })



}




export default { register, adminLogin, logOut, getUsers, login, updateProfile, socialLogin, getSession, getProfile, checkUserName }