import { PrismaClient } from "@prisma/client";
import Utils from "@utils";
import { Request, Response } from "express";

const prisma = new PrismaClient()

const getFollowers = (req: Request, res: Response) => {
    const { userId, followerUserId } = req.body;

    prisma.followers.findMany({
        where: { userId: userId },
        select: {
            id: true,
            followerUserId: true,
            createdAt: true,
            updatedAt: true,
            user: {
                select: {
                    userName: true,
                    email: true,
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
            userId: req.user.userId
        }
    }).then(data => {
        if (data?.length === 0) {
            prisma.followers.create({
                data: {
                    followerUserId: req.body.followerUserId,
                    userId: req.user.userId,
                    isFollow: req.body.isFollow === 'true'
                }
            }).then(result => {
                res.json({
                    status: true,
                    message: 'Successfully save...',
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


