import Users from "@controllers/Users";
import Auth from "@auth";
import { Router } from "express";
import Search from "@controllers/Search";
import Like from "@controllers/Like";
import Videos from "@controllers/Videos";
import Comment from "@controllers/Comment";
import Advertiestment from "@controllers/Advertiestment";
import Followers from "@controllers/Followers";

const routes = Router();


// Post Router............

routes.post('/login', Users.login)
routes.post('/register', Users.register)
routes.post('/socialLogin', Users.socialLogin)
routes.post('/checkUserName', Users.checkUserName)
routes.post('/updateProfile', Auth.isAuthenticated, Users.updateProfile)
routes.post('/search', Auth.isAuthenticated, Search.search)
routes.post('/postVideo', Auth.isAuthenticated, Videos.postVideo)
routes.post('/addLIke', Auth.isAuthenticated, Like.addLike)
routes.post('/addComment', Auth.isAuthenticated, Comment.addComment)
routes.post('/addComment', Auth.isAuthenticated, Comment.addComment)
routes.post('/addAdvertiesment', Auth.isAuthenticated, Advertiestment.addAdvertiesment)
routes.post('/deleteAdvertiesment', Auth.isAuthenticated, Advertiestment.deleteAdvertiesment)
routes.post('/addFollower', Auth.isAuthenticated, Followers.addFollower)
routes.post('/getFollower', Auth.isAuthenticated, Followers.getFollowers)
routes.post('/getVideos', Auth.isAuthenticated, Videos.getVideos)
routes.post('/getProfile', Auth.isAuthenticated, Users.getProfile)

// Get Router..............
routes.get('/getComment', Auth.isAuthenticated, Comment.getComment)
routes.get('/getAdvertiesment', Auth.isAuthenticated, Advertiestment.getAdvertiesment)




// routes.post('/upload', async (req: any, res: any) => {
//     // console.log("Req:",req.files.myFile);

//     const file = await FileUtils.addFile(req.files?.myFile, 'Test/');
//     // console.log('file:',file);
//     res.json(file)
// })




// for testing purpose
routes.get('/', (req: any, res: any) => {

    res.json("Api Successfully work ");
});

// redirect routes when routes not found

routes.all('*', (req: any, res: any) => {
    res.status(200).json({
        status: false,
        message: 'Sorry invalid request'
    });
});

export default routes;

