import Followers from "../services/Followers";
import Utils from "../utils/Utils";
import { Request, Response } from "express";

const addFollower = (req: Request, res: Response) => {
    const { userId, isFollow } = req.body;
    if (Utils.isEmpty(userId)) {

        res.json({
            status: false,
            message: "Require userId..."
        })

    } else if (Utils.isEmpty(isFollow)) {
        res.json({
            status: false,
            message: "Require isFollow..."
        })

    } else {
        Followers.addFollower(req, res)
    }

}


const getFollowers = (req: Request, res: Response) => {

    if (Utils.isEmpty(req.body?.isFollow)) {
        return res.json({
            status: false,
            message: 'Require isFollow...'
        })
    }
    Followers.getFollowers(req, res)
}




export default { addFollower, getFollowers };