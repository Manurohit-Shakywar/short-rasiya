import Followers from "@services/Followers";
import Utils from "@utils";
import { Request, Response } from "express";

const addFollower = (req: Request, res: Response) => {
    const { followerUserId, isFollow } = req.body;
    if (Utils.isEmpty(followerUserId)) {

        res.json({
            status: false,
            message: "Require followerUserId..."
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

    Followers.getFollowers(req, res)
}




export default { addFollower, getFollowers };