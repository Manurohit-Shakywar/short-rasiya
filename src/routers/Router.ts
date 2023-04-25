import Users from "@controllers/Users";
import Auth from "@auth";
import { Router } from "express";
import Search from "@controllers/Search";
import Like from "@controllers/Like";
import Videos from "@controllers/Videos";

const routes = Router();


// Post Router............

routes.post('/login', Users.login)
routes.post('/register', Users.register)
routes.post('/socialLogin', Users.socialLogin)
routes.post('/checkUser', Users.socialLogin)
routes.post('/updateProfile', Users.socialLogin)
routes.post('/search', Search.search)
routes.post('/postVideo', Videos.postVideo)
routes.post('/setLike', Like.addLike)


// Get Router..............
// routes.get('/getVideos', Auth.isAuthenticated, Like.getVideos)




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

