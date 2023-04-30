import jwt from "jsonwebtoken";

const generateAccessToken = (user: any) => {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "365d" })
}

// refreshTokens
let refreshTokens = []

const generateRefreshToken = (user: any) => {
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET as string, { expiresIn: "365d" })
    refreshTokens.push(refreshToken)
    return refreshToken
}


const isAuthenticated = (req: any, res: any, next: any) => {
    const token = req.headers["authorization"]?.replace("Bearer ", '');

    if (!token) {
        return res.json({
            status: false,
            message: 'A token is required for authentication'
        });
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, (err: any, user: any) => {
        console.log("")
        if (err) {
            res.json({
                status: false,
                message: 'Invalid token!'
            })
        }
        else {
            req.user = user
            next() //proceed to the next action in the calling function
        }
    }) //end of jwt.verify()
} //end of function
// try {
//     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
//     req.user = decoded;
// } catch (err) {
//     return res.status(200).send("Invalid Token");
// }
// return next();
// };

// const isAuthenticated = (req: any, res: any, next: any) => {

//     console.log('Cookies:',JSON.stringify(req.headers.cookie));
//     // console.log('UserDetails:',req);

//     if (req.session.user) next()
//     else res.json({ status: false, isExpire: true, message: 'You are not a valid user' })
// }


export default { isAuthenticated, generateAccessToken, generateRefreshToken };
