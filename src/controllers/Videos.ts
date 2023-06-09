import Videos from "../services/Videos"
import Utils from "../utils/Utils";
import { Request, Response } from "express"

const postVideo = (req: Request, res: Response) => {


    if (Utils.isEmpty(req.body.title)) {
        res.json({
            status: false,
            message: 'title require...'
        })
    } else if (!req.files?.path) {
        res.json({
            status: false,
            message: 'path require...'
        })
    } else if (!req.files?.thumbnail) {
        res.json({
            status: false,
            message: 'thumbnail require...'
        })
    } else {
        Videos.postVideo(req, res);
    }
}
const getVideos = (req: Request, res: Response) => {

    if (Utils.isEmpty(req.body.page)) {

        return res.json({
            status: false,
            message: 'Require page...'
        })
    }
    Videos.getVideos(req, res);

}

export default { getVideos, postVideo }