import Utils from "@utils";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient()


const addLike = (req: any, res: Response) => {

    prisma.likes.findMany({
        where: {
            videoId: req.body.videoId,
            userId: req.user.userId
        }
    }).then((data:any) => {
        // console.log("Data:",data)
        if (data.length===0) {
            prisma.likes.create({
                data: {
                    isLike: req.body.isLike === 'true',
                    userId: req.user.userId,
                    videoId: req.body.videoId,
                }
            }).then((result:any) => {
                res.json({
                    status: true,
                    message: 'Successfully like...',
                    result
                })
            }).catch((err:any) => {
                res.json({
                    status: false,
                    message: Utils.onError(err)
                })
            })
        } else {
            prisma.likes.update({
                where: { id: data[0]?.id??req.body.videoId },
                data: { isLike: req.body.isLike === 'true', }
            }).then((result:any) => {
                res.json({
                    status: true,
                    message: req.body.isLike === 'true' ? 'Successfully like...' : 'Successfully unlike...',
                    result,
                })
            }).catch((err:any) => {
                res.json({
                    status: false,
                    message: Utils.onError(err)
                })
            })
        }

    }).catch((err:any) => {
        res.json({
            status: false,
            message: Utils.onError(err)
        })
    })


}

export default { addLike }