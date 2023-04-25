import { PrismaClient } from "@prisma/client";
import Utils from "@utils";
import { Request, Response } from "express";
const prisma = new PrismaClient()


const getComment = (req: any, res: Response) => {

    prisma.comments.findMany({ where: { videoId: req?.query?.id } }).then(result => {
        res.json({
            status: true,
            message: "Successfully fetch...",
            result
        })

    }).catch(err => {
        res.json({
            status: false,
            message: Utils.onError(err)
        })


    })

}


const addComment = (req: any, res: Response) => {

    req.body.userId = req.user.userId;
    prisma.comments.create({ data: req.body }).then(result => {
        res.json({
            status: true,
            message: "Successfully save...",
            result
        })

    }).catch(err => {
        res.json({
            status: false,
            message: Utils.onError(err)
        })
    })


}




export default { getComment, addComment }