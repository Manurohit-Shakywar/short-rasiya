import Advertiestment from "@services/Advertiestment";
import Utils from "@utils";
import { Request, Response } from "express"


const addAdvertiesment = (req: any, res: Response) => {
    const { brandName, link } = req.body;
    if (!req.files.thumbnail) {
        res.json({
            status: false,
            message: "Require thumbnail...",
        })
    } else if (Utils.isEmpty(link)) {
        res.json({
            status: false,
            message: "Require link...",
        })
    } else {
        Advertiestment.addAdvertiesment(req, res)
    }

}

const getAdvertiesment = (req: Request, res: Response) => {
    Advertiestment.getAdvertiesment(req, res)

}
const deleteAdvertiesment = (req: Request, res: Response) => {

    if (Utils.isEmpty(req.body.id)) {
        return res.json({
            status: false,
            message: "Require id...",
        })
    }
    Advertiestment.deleteAdvertiesment(req, res)

}


export default { addAdvertiesment, getAdvertiesment, deleteAdvertiesment }