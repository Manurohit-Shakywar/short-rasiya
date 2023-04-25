import { PrismaClient } from "@prisma/client";
import Utils from "@utils";
import { Request, Response } from "express"
const prisma = new PrismaClient()


const addAdvertiesment = (req: Request, res: Response) => {

    prisma.advertiesment.create({ data: req.body }).then(result => {
        res.json({
            status: true,
            message: "Successfully save...",
        })

    }).catch(err => {
        res.json({
            status: true,
            message: Utils.onError(err),
        })
    })

}

const getAdvertiesment = (req: Request, res: Response) => {

    prisma.advertiesment.findMany().then(result => {
        res.json({
            status: true,
            message: "Successfully fetch...",
            result
        })
    }).catch(err => {
        res.json({
            status: true,
            message: Utils.onError(err),
        })
    })

}
const deleteAdvertiesment = (req: Request, res: Response) => {

    prisma.advertiesment.findUnique({ where: { id: req.body.id } }).then(result => {
        res.json({
            status: true,
            message: "Successfully delete...",
            result
        })
    }).catch(err => {
        res.json({
            status: true,
            message: Utils.onError(err),
        })
    })


}


export default { addAdvertiesment, getAdvertiesment, deleteAdvertiesment }