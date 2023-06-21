import Comment from "../services/Comment";
import Utils from "../utils/Utils";
import { Request, Response } from "express";


const getComment = (req: Request, res: Response) => {

    if (Utils.isEmpty(req.query.id)) {
        return res.json({
            status: false,
            message: "Require id..."
        })
    }

    Comment.getComment(req, res)

}



const addComment = (req: Request, res: Response) => {

    if (Utils.isEmpty(req.body?.videoId)) {
        res.json({
            status: false,
            message: "Require videoId..."
        })

    } else if (Utils.isEmpty(req.body?.comment)) {
        res.json({
            status: false,
            message: "Require comment..."
        })

    } else {
        Comment.addComment(req, res)
    }

}


export default { getComment, addComment }