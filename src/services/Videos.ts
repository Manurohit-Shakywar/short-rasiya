import { PrismaClient } from "@prisma/client"
import Utils from "@utils"
import { Request, Response } from "express"
import FileUtils from "utils/FileUtils"
const prisma = new PrismaClient()

const postVideo = async (req: any, res: Response) => {
    const { title, description, artiestName, isCommentShow, isPublic, isDuet, isLikeShow, isDownload, userId } = req.body
    const path = await FileUtils.addFile(req?.files?.path, 'ShortVideo', 'video') ?? '';
    // const thumbnail = await FileUtils.addFile(req?.files?.thumbnail, 'Thumbnails', 'image') ?? '';

    prisma.videos.create({
        data: {
            title: title,
            description: description ?? '',
            artiestName: artiestName,
            userId: req?.user?.userId,
            path: path,
            thumbnail: "",
        }
    }).then(result => {
        res.json({
            status: true,
            message: 'Video successfully save...',
            result
        })
    }).catch(err => {
        res.json({ status: false, message: Utils.onError(err) })
    })
}


const getVideos = (req: Request, res: Response) => {
    const num = parseInt(req.body.page) - 1
    const skip = Utils.PAGE_NUMBER * num;
    prisma.videos.findMany(
        {
            skip: skip,
            take: Utils.PAGE_NUMBER,
            include: {
                likes: {
                    select: {
                        isLike: true,
                    }
                },

                user: {
                    select: {
                        userName: true,
                        profile: {
                            select: {
                                profileImg: true,
                            }
                        }
                    }
                }
            },
        }
    ).then(async result => {
        const totalCount =  Math.round(await prisma.videos.count() / Utils.PAGE_NUMBER);
        res.json({
            status: true,
            message: 'Successfully fetch...',
            totalCount,
            result: result.map((i: any) => {
                i.likes.length > 0 && i.likes[0].isLike ? i.isLike = true : i.isLike = false
                i.userName = i.user.userName
                i.profileImg = i.user?.profile?.profileImg
                delete i.likes
                delete i.user
                return i
            })
        })
    }).catch(err => res.json({ status: false, message: Utils.onError(err) }))

}


export default { postVideo, getVideos }