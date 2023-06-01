import { PrismaClient } from "@prisma/client";
import Utils from "@utils";
import { Request, Response } from "express";

const prisma = new PrismaClient()

const getFollowers = (req: any, res: Response) => {
    const userId = req?.body?.userId?.length > 0 ? req?.body?.userId : req.user?.userId
    const isFollow = req.body.isFollow === 'true'
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
        })
    }).catch(err => {
        res.json({ status: false, message: Utils.onError(err) })
    })

}


const addFollower = (req: any, res: Response) => {

    prisma.followers.findMany({
        where: {
            userId: req.body.userId
        }
    }).then(data => {
        if (data?.length === 0) {
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
                })
            }).catch((err: any) => {

                res.json({ status: false, message: Utils.onError(err) })
            })
        } else {
            prisma.followers.update({
                where: { id: data[0]?.id ?? req.body.id },
                data: { isFollow: req.body.isFollow === 'true', }
            }).then(result => {
                res.json({
                    status: true,
                    message: req.body.isFollow === 'true' ? 'Successfully follow...' : 'Successfully unfollow...',
                    result
                })
            }).catch((err: any) => {
                res.json({
                    status: false,
                    message: Utils.onError(err)
                })
            })
        }

    }).catch(err => {
        res.json({
            status: false,
            message: Utils.onError(err)
        })
    })



}

export default { addFollower, getFollowers }


