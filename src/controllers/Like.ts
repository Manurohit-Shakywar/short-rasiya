import Like from "@services/Like";
import Utils from "@utils";
import { Request, Response } from "express"





const addLike = (req: Request, res: Response) => {

    const { videoId, isLike } = req.body;
    if (Utils.isEmpty(videoId)) {

        res.json({
            status: false,
            message: "Require videoId...",
        })

    } else if (Utils.isEmpty(isLike)) {
        res.json({
            status: false,
            message: "Require isLike...",
        })
    } else {
        Like.addLike(req, res)
    }

}





export default { addLike }