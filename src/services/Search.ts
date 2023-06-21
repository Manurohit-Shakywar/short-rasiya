import { PrismaClient } from "@prisma/client";
import Utils from "../utils/Utils";
import { Request, Response } from "express";

const prisma = new PrismaClient()



const search = async (req: any, res: Response) => {


    const videos = await prisma.videos.findMany({ where: { title: { contains: req.body?.text } },include: {
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
    } })
    const users = await prisma.users.findMany({
        where: {
            userId: {
                not: req?.user?.userId
            },
            AND: [
                {
                    OR: [
                        {
                            userName: {
                                contains: req.body.text ?? '',
                            }
                        },
                        {
                            email: {
                                contains: req.body.text ?? '',
                            },
                        }, {
                            profile: {
                                fullName: {
                                    contains: req.body.text ?? '',
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
                    isFollow:true
                }
            },
            profile: {
                select: {
                    fullName: true,
                    profileImg: true
                }
            }
        }
    })

    res.json({
        status: true,
        message: 'Successfully search...',
        videos:videos.map((i: any) => {
            i.likes.length > 0 && i.likes[0].isLike ? i.isLike = true : i.isLike = false
            i.userName=i.user.userName
            i.profileImg=i.user?.profile?.profileImg
            delete i.likes
            delete i.user
            return i
        }),
        users: users.map((i: any) => {
            i.isFollow = i.followers[0]?.isFollow ? true : false
            delete i.followers
            return i
        })
    })
}


export default { search }


